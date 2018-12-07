import Vue from 'vue';
import AtComponents from 'at-ui';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import 'at-ui-style/src/index.scss';

Vue.config.productionTip = false;
Vue.use(AtComponents);

router.beforeEach((to, from, next) => {
  const currentUser = store.state.auth.user;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
});

// Auth first before loading the app
store.dispatch('auth/authenticate')
  .catch(() => {})
  .then(() => {
    // eslint-disable-next-line no-new
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  });
