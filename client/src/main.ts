import 'primeicons/primeicons.css'
import 'vue-toastification/dist/index.css'

import { definePreset } from '@primeuix/themes'
import Material from '@primeuix/themes/material'
import { initializeApp } from 'firebase/app'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import App from './App.vue'
import './assets/base.css'
import { FIREBASE_CONFIG } from './constants/database/FIREBASE_CONFIG'
import router from './router'

initializeApp(FIREBASE_CONFIG)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)

const tellMePreset = definePreset(Material, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
  },
  components: {
    divider: {
      css: `.p-divider-horizontal {
      margin: 0;
      }`,
    },
    card: {
      css: `.p-card {
      border: 1px solid var(--p-indigo-500);
      }`,
    },
  },
})

app.use(PrimeVue, {
  theme: {
    preset: tellMePreset,
  },
})

app.mount('#app')
