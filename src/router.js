import Vue from "vue";
import Router from "vue-router";

import Index from "./views/Index.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  saveScrollPostion: true,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      meta: {
        title: "欢迎 - EroGame"
      }
    },
    {
      path: "/games/:page?",
      name: "games",
      component() {
        return import(/* webpackChunkName: "games" */ "./views/Games.vue");
      },
      meta: {
        isBack: false,
        title: "发现 - EroGame"
      }
    },
    {
      path: "/category",
      name: "category",
      component() {
        return import(
          /* webpackChunkName: "category" */ "./views/Category.vue"
        );
      },
      meta: {
        title: "分类 - EroGame"
      }
    },
    {
      path: "/detail/:id",
      name: "detail",
      component() {
        return import(/* webpackChunkName: "detail" */ "./views/Detail.vue");
      }
    },
    {
      path: "/admin/create",
      name: "create",
      component() {
        return import(/* webpackChunkName: "create" */ "./views/Create.vue");
      },
      meta: {
        title: "添加游戏 - EroGame"
      }
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
