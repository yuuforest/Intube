import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
// import axios from './api/http'
// import VueCookies from "vue-cookies"

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  // .use(axios)
  // .use(VueCookies)
  .mount('#app');

  // Vue.$cookies.config("7d"); 쿠키 만료일 따로 지정해야하는지
