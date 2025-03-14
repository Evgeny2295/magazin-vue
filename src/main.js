import { createApp } from 'vue'

import {router} from '@/router/router.js'

import store from './store.js'

import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
