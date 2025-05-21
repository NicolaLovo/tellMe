import 'primeicons/primeicons.css'
import 'vue-toastification/dist/index.css'
import './assets/base.css'

import { initializeApp } from 'firebase/app'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import App from './App.vue'
import { FIREBASE_CONFIG } from './constants/database/FIREBASE_CONFIG'
import router from './router'

initializeApp(FIREBASE_CONFIG)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)

app.mount('#app')
