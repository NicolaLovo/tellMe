<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const onSubmit = () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
}
</script>

<template>
  <div class="register-container">
    <div class="content">
      <h1 class="title">Registrazione Ente</h1>
      <p class="subtitle">Crea il tuo account per iniziare.</p>

      <form @submit.prevent="onSubmit">
        <InputText v-model="email" placeholder="Email" class="input" />
        <input type="password" v-model="password" placeholder="Password" class="input" />
        <Button label="Registrati" icon="pi pi-user-plus" class="btn" type="submit" />
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

.register-container {
  background: #ffffff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  padding: 20px;
}

.content {
  background: #fff;
  padding: 50px 40px 60px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(102, 78, 255, 0.15);
  max-width: 450px;
  width: 100%;
  text-align: center;
}

.title {
  font-size: 2.8rem;
  color: #5e4b8b;
  font-weight: 700;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.3rem;
  color: #6b6b6b;
  margin-bottom: 35px;
  font-weight: 500;
}

.input {
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.btn {
  padding: 12px 25px;
  background-color: #9578f4;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  width: 100%;
  margin-top: 15px;
}

.btn:hover {
  background-color: #815aff;
  transform: scale(1.05);
}

.btn:focus {
  outline: none;
}
</style>
