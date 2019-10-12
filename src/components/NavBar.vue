<template>
  <div class="ui inverted segment" id="navbar-outer">
    <div class="ui inverted secondary pointing menu">
      <a @click="goto('index')" class="item logo header">
        魔法使之家-仓库
      </a>
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
        <a
          @click="$router.push({ name: 'create' })"
          class="item"
          v-if="islogin"
        >
          新建
        </a>
        <a class="item">
          Bakabie
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isMobile: document.body.clientWidth <= 768,
      islogin: false,
      navItems: {
        games: {
          route: "games",
          icon: "game",
          content: "游戏库"
        },
        category: {
          route: "category",
          icon: "archive",
          content: "分类 / 搜索"
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
      const auth = await this.$api.get("/auth/verify");
      return auth.isLogin;
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
