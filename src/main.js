import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
if(localStorage.getItem('token') != "undefined"){
  let token = JSON.parse( localStorage.getItem('token') );
  if( token ){
    store.dispatch('setToken', token);
  }
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
