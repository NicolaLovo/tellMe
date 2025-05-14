<template>
  <div class="comune-container">
    <div class="content">
      <h1 class="title">Accedi come Comune</h1>
      <p class="subtitle">Inserisci la tua password per accedere.</p>

      <div class="input-group">
        <input
          v-model="password"
          type="password"
          placeholder="Inserisci la password"
          class="password-input"
        />
      </div>

      <div class="button-group">
        <button @click="handleAccedi" class="btn">Accedi</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const password = ref('')

// Funzione che può essere usata per gestire l'accesso
const handleAccedi = () => {
  if (password.value === '') {
    alert('Inserisci una password!')
  } else {
    // Logica per il login (questa parte va implementata)
    alert('Accesso effettuato con successo!')
  }
}
</script>

<style scoped>
.comune-container {
  background-color: #f0f0f0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
}

.content {
  text-align: center;
  background-color: #fff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 90%;
}

.title {
  font-size: 2.5rem;
  color: #5e4b8b;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 20px;
}

.password-input {
  padding: 12px 20px;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
  outline: none;
}

.password-input:focus {
  border-color: #8e7cc3;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.btn {
  padding: 12px 25px;
  background-color: #8e7cc3;
  color: white;
  font-size: 1rem;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.btn:hover {
  background-color: #7a68a1;
  transform: scale(1.05);
}

.btn:focus {
  outline: none;
}
</style>
