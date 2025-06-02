<script setup lang="ts">
import { APP_ROUTES } from '@/constants/APP_ROUTES'
</script>
<template>
  <div class="home-container">
    <!-- Onde animate LILLA SOPRA -->
    <div class="animated-bg top">
      <!-- SVG identico, ma rovesciato -->
      <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <!-- Livello 1 -->
        <path fill="#9fa8da" fill-opacity="0.5">
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z;
              M0,140 C360,220 1080,100 1440,140 L1440,320 L0,320 Z;
              M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z;"
          />
        </path>
        <path fill="#7986cb" fill-opacity="0.7">
          <animate
            attributeName="d"
            dur="16s"
            repeatCount="indefinite"
            values="
              M0,180 C400,260 1040,100 1440,180 L1440,320 L0,320 Z;
              M0,160 C400,240 1040,120 1440,160 L1440,320 L0,320 Z;
              M0,180 C400,260 1040,100 1440,180 L1440,320 L0,320 Z;"
          />
        </path>
        <path fill="#3f51b5" fill-opacity="1">
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="
              M0,200 C480,280 960,120 1440,200 L1440,320 L0,320 Z;
              M0,180 C480,260 960,140 1440,180 L1440,320 L0,320 Z;
              M0,200 C480,280 960,120 1440,200 L1440,320 L0,320 Z;"
          />
        </path>
      </svg>
    </div>

    <!-- Onde animate LILLA SOTTO -->
    <div class="animated-bg bottom">
      <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <!-- Stesso SVG del blocco sopra -->
        <path fill="#9fa8da" fill-opacity="0.5">
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z;
              M0,140 C360,220 1080,100 1440,140 L1440,320 L0,320 Z;
              M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z;"
          />
        </path>
        <path fill="#7986cb" fill-opacity="0.7">
          <animate
            attributeName="d"
            dur="16s"
            repeatCount="indefinite"
            values="
              M0,180 C400,260 1040,100 1440,180 L1440,320 L0,320 Z;
              M0,160 C400,240 1040,120 1440,160 L1440,320 L0,320 Z;
              M0,180 C400,260 1040,100 1440,180 L1440,320 L0,320 Z;"
          />
        </path>
        <path fill="#3f51b5" fill-opacity="1">
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="
              M0,200 C480,280 960,120 1440,200 L1440,320 L0,320 Z;
              M0,180 C480,260 960,140 1440,180 L1440,320 L0,320 Z;
              M0,200 C480,280 960,120 1440,200 L1440,320 L0,320 Z;"
          />
        </path>
      </svg>
    </div>

    <!-- Contenuto principale -->
    <Card
      style="
        max-width: 60%;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        padding: 2rem;
        background: white;
      "
    >
      <template #title>
        <h1>Benvenuto nella Home Page</h1>
      </template>
      <template #content>
        <div class="button-group">
          <router-link :to="APP_ROUTES.citizen.welcome">
            <Button label="Utente" style="width: 100%" />
          </router-link>
          <router-link :to="APP_ROUTES.agency.welcome">
            <Button label="Ente" style="width: 100%" />
          </router-link>
          <router-link :to="APP_ROUTES.townCouncil.welcome">
            <Button label="Comune" style="width: 100%" />
          </router-link>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to top, #f8f4fa, #ffffff);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 1rem;
  z-index: 0;
}

.animated-bg {
  position: absolute;
  left: 0;
  width: 100%;
  z-index: -1;
}

.animated-bg.top {
  top: 0;
  transform: rotate(180deg);
}

.animated-bg.bottom {
  bottom: 0;
}

.button-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 100%;
}

h1 {
  margin-bottom: 1rem;
  font-size: 2rem;
  text-align: center;
}
</style>
