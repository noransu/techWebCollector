import { createApp } from 'vue'
import '@/assets/css/index.css'

import { setupStore } from '@/store'
import App from './App/App.vue';

(async () => {
  const app = createApp(App)

  // Configure vuex store
  setupStore(app)

  app.mount('#app', true)
})()
