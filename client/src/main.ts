import './assets/base.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { FIREBASE_CONFIG } from './constants/database/FIREBASE_CONFIG'
import { initializeApp } from 'firebase/app'

initializeApp(FIREBASE_CONFIG);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

