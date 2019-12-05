<template>
  <div class="content">
    <div class="holder" style="height: 6em"></div>
    <div class="ui text container">
      <div class="ui segment">
        <div id="back">
          <button class="ui basic icon button" @click="$router.go(-1)">
            <i class="icon angle left"></i>
          </button>
        </div>
        <div id="title">
          <h3>{{ game.title }}</h3>
        </div>
      </div>
      <div v-if="loading">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </div>
      <div v-if="!loading" class="ui raised segment" id="content">
        <vue-markdown id="markdown" :source="game.content" v-if="!loading"></vue-markdown>
        <div class="ui section divider"></div>
        <div id="tags">
          <h1>标签</h1>
          <div class="ui labels">
            <span v-for="tag in game.tag.split('/')" :key="tag" class="ui label">{{ tag }}</span>
          </div>
        </div>
        <br />
        <div id="download" v-html="downloadLink">
          <!--<h2>下载</h2>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  components: { VueMarkdown },
  methods: {
    async loadDeatil() {
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
      const game = await this.$api.get(`/archive/${this.$route.params.id}`, {
        headers: {
          Authorization: "Bearer " + jwt
        }
      });
      this.game = game.data;
      console.log(this.game);

      // const link = await this.$api.get(
      //   `/archive/${this.$route.params.id}`
      // );
      const link = this.game.primary_content;
      this.downloadLink = link;
      document.title = `${this.game.title} - EroGame`;
      this.loading = false;
    }
  },
  async mounted() {
    document.title = "加载中... - EroGame";
    this.loadDeatil();
  },
  data() {
    return {
      game: {
        title: "加载中...",
        content: ""
      },
      loading: true,
      downloadLink: ""
    };
  }
};
</script>

<style lang="less" scoped>
#back,
#title {
  display: inline-block;
}

#title {
  margin: auto 1em;
  vertical-align: middle;
  font-size: 1.5em;
}

#download {
  word-wrap: break-word;
}

#content {
  min-height: 73vh;
  margin-bottom: 2em;
}

.spinner {
  width: 60px;
  height: 60px;

  position: relative;
  margin: 2em auto;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgb(190, 190, 190);
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: bounce 2s infinite ease-in-out;
  animation: bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>

<style lang="less">
#markdown {
  & > p {
    //text-align: center;

    img {
      width: 90%;
      display: block;
      margin: 0 auto;
    }
  }

  blockquote {
    background: #f9f9f9;
    border-left: 10px solid #ccc;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
    quotes: "\201C""\201D""\2018""\2019";

    &:before {
      color: #ccc;
      content: open-quote;
      font-size: 4em;
      line-height: 0.1em;
      margin-right: 0.25em;
      vertical-align: -0.4em;
    }

    p {
      display: inline;
    }
  }
}
</style>
