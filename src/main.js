import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import notificationsModule from "./store/toast-notifications-store";

Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  strict: true,
  modules: {
    notifications: notificationsModule()
  }
});

new Vue({
  store,
  render: (h) => h(App)
}).$mount("#app");
