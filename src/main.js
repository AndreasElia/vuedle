import { createApp } from 'vue'
import App from './App.vue'
import socketPlugin from './plugins/socket'
import './index.css'

const host = process.env.NODE_ENV === 'production'
  ? window.location.host
  : 'http://localhost:1992'

createApp(App)
  .use(socketPlugin, {
    connection: host
  })
  .mount('#app')
