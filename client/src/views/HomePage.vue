<script setup lang="ts">
import { APP_ROUTES } from '@/constants/APP_ROUTES'
</script>

<template>
  <div class="home-container">
    <div class="animated-bg top">
      <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path fill="#9fa8da" fill-opacity="0.5">
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
      M0,180 C360,320 1080,100 1440,180 L1440,320 L0,320 Z;
      M0,160 C360,300 1080,120 1440,160 L1440,320 L0,320 Z;
      M0,180 C360,320 1080,100 1440,180 L1440,320 L0,320 Z;"
          />
        </path>

        <path fill="#7986cb" fill-opacity="0.7">
          <animate
            attributeName="d"
            dur="16s"
            repeatCount="indefinite"
            values="
      M0,200 C400,340 1040,140 1440,200 L1440,320 L0,320 Z;
      M0,180 C400,320 1040,160 1440,180 L1440,320 L0,320 Z;
      M0,200 C400,340 1040,140 1440,200 L1440,320 L0,320 Z;"
          />
        </path>

        <path fill="#3f51b5" fill-opacity="1">
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="
      M0,220 C480,360 960,160 1440,220 L1440,320 L0,320 Z;
      M0,200 C480,340 960,180 1440,200 L1440,320 L0,320 Z;
      M0,220 C480,360 960,160 1440,220 L1440,320 L0,320 Z;"
          />
        </path>
      </svg>
    </div>

    <div class="animated-bg bottom">
      <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path fill="#9fa8da" fill-opacity="0.5">
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
      M0,180 C360,320 1080,100 1440,180 L1440,320 L0,320 Z;
      M0,160 C360,300 1080,120 1440,160 L1440,320 L0,320 Z;
      M0,180 C360,320 1080,100 1440,180 L1440,320 L0,320 Z;"
          />
        </path>

        <path fill="#7986cb" fill-opacity="0.7">
          <animate
            attributeName="d"
            dur="16s"
            repeatCount="indefinite"
            values="
      M0,200 C400,340 1040,140 1440,200 L1440,320 L0,320 Z;
      M0,180 C400,320 1040,160 1440,180 L1440,320 L0,320 Z;
      M0,200 C400,340 1040,140 1440,200 L1440,320 L0,320 Z;"
          />
        </path>

        <path fill="#3f51b5" fill-opacity="1">
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="
      M0,220 C480,360 960,160 1440,220 L1440,320 L0,320 Z;
      M0,200 C480,340 960,180 1440,200 L1440,320 L0,320 Z;
      M0,220 C480,360 960,160 1440,220 L1440,320 L0,320 Z;"
          />
        </path>
      </svg>
    </div>

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
        <h1>Benvenuto</h1>
        <h3>Accedi prima di continuare</h3>
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
  top: -5px;
  transform: rotate(180deg);
}

.animated-bg.bottom {
  bottom: -5px;
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
  text-align: center;
}
</style>
