import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import api from "./utils/axios.js";
import SuiVue from "semantic-ui-vue";
import "semantic-ui-css/semantic.min.css";
// import Vuex from "vuex";

Vue.config.productionTip = false;

Vue.use(SuiVue);
Vue.use(api);
/* Vue.use(Vuex);
 *
 * const store = new Vuex.Store({
 *   state: {
 *     gameLoad: true
 *   },
 *   getters: {},
 *   actions: {},
 *   mutations: {}
 * });
 */

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount("#app");
