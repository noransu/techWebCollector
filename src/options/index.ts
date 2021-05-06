import { createApp } from 'vue'

import App from './App/App.vue';

(async () => {
  const app = createApp(App)
  app.mount('#app', true)
})()
