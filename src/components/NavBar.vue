<template>
  <div class="ui inverted segment" id="navbar-outer">
    <div class="ui inverted secondary pointing menu">
      <a @click="goto('index')" class="item logo header">魔法使之家-仓库</a>
      <a
        v-for="v in navItems"
        :key="v.route"
        @click="goto(v.route)"
        :class="[{ active: isActive(v.route) }, 'item']"
      >
        <i :class="[v.icon, 'icon']"></i>
        <span class="content" v-if="!isMobile">{{ v.content }}</span>
      </a>
      <div class="right menu">
        <a @click="$router.push({ name: 'create' })" class="item" v-if="islogin">投稿</a>
        <a class="item" href="https://login.ero.ink/">{{username}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      username: "登陆",
      isMobile: document.body.clientWidth <= 768,
      islogin: false,
      navItems: {
        games: {
          route: "games",
          icon: "game",
          content: "galgame"
        },
        krkr: {
          route: "krkr",
          icon: "game",
          content: "krkr资源"
        },
        other: {
          route: "other",
          icon: "game",
          content: "杂货铺"
        },
        category: {
          route: "category",
          icon: "archive",
          content: "搜索"
        }
      }
    };
  },
  methods: {
    goto(where) {
      this.$router.push({ name: where });
    },
    isActive(name) {
      return this.$route.name === name;
    },
    async isLogin() {
      function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i].trim();
          if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
      }
      let jwt = getCookie("token");
      let resp = await this.$api
        .get(`user/`, {
          headers: {
            Authorization: "Bearer " + jwt
          }
        })
        if(resp.status == 0){
          this.username = resp.data.user_name;
          return true
        }else{
          return false
        }
    }
  },
  async mounted() {
    this.islogin = await this.isLogin();
  }
};
</script>

<style lang="less" scoped>
span.content {
  margin-left: 12px;
}
i.icon {
  margin-right: 0 !important;
}
#navbar-outer {
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  border-radius: 0;
  padding-top: 12px;
  opacity: 0.74;
}
</style>
