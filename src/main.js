import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';


Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  Util.title(to.meta.title);
  next();
});

router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});


const store = new Vuex.Store({
  state: {
    count: 0,
    projects: [
      {
        id: "1",
        name: "java"
      },
      {
        id: "2",
        name: "JS"
      }
    ]
  },
  getters: {

  },
  mutations: {
    increment(state) {
      state.count++;
      state.projects = [];
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
});


new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
});