<template>
  <div>
    <div class="holder" style="height: 8em"></div>
    <div class="ui centered grid container">
      <GameCard
        v-for="gameobj in games"
        :key="gameobj.id"
        :game="gameobj"
      ></GameCard>
      <div class="sixteen wide column" v-if="loading">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </div>
      <div class="sixteen wide column">
        <div class="fluid ui buttons">
          <button
            :class="[{ disabled: page === 1 }, 'ui', 'button']"
            @click="prePage"
          >
            上一页
          </button>
          <button
            :class="[{ disabled: page === totalPage }, 'ui', 'button']"
            @click="nextPage"
          >
            {{ page !== totalPage ? "下一页" : "没有更多了" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameCard from "@/components/GameCard.vue";

export default {
  name: "Games",
  components: {
    GameCard
  },
  methods: {
    async load() {
      this.loading = true;
      let resp = await this.$api.get(`/game/index/api/index/${this.page}`);
      let data = resp.data;
      if (data.length === 0) {
        this.totalPage = --this.page;
        this.$router.push({ name: "games", params: { page: this.page } });
        this.pushback = true;
        this.loading = false;
        return null;
      }
      if (this.pushback) {
        this.pushback = false;
        this.loading = false;
        return null;
      }
      this.games = [];
      data.forEach(element => {
        if (!element.cover.startsWith("http"))
          element.cover = "https://api.ero.ink" + element.cover;
        this.games.push(element);
      });
      this.loading = false;
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    },
    async prePage() {
      this.$router.push({ name: "games", params: { page: --this.page } });
    },
    async nextPage() {
      this.$router.push({ name: "games", params: { page: ++this.page } });
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "detail") {
      to.meta.isBack = true;
    }
    next();
  },
  async beforeRouteUpdate(to, from, next) {
    if (from.name === to.name) {
      await this.load();
    }
    next();
  },
  async activated() {
    if (!this.$route.meta.isBack) {
      await this.load();
    }
    this.$route.meta.isBack = false;
  },
  data() {
    let p = this.$route.params.page;
    if (p === undefined) {
      p = 1;
    } else {
      p = parseInt(p);
    }
    return {
      games: [],
      page: p,
      totalPage: NaN,
      pushback: false,
      loading: false
    };
  }
};
</script>

<style lang="less" scoped>
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
