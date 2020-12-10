import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'

Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue();

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
