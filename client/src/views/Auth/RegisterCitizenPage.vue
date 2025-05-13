<template>
  <div class="register-container">
    <div class="content">
      <h1 class="title">Registrazione</h1>
      <p class="subtitle">Crea il tuo account per iniziare.</p>

      <form @submit.prevent="register">
        <input type="email" placeholder="Email" v-model="email" class="input" />
        <input type="password" placeholder="Password" v-model="password" class="input" />
        <button type="submit" class="btn">Registrati</button>
      </form>

      <button @click="registerWithGoogle" class="btn-google">Registrati con Google</button>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <p class="alternative">
        Hai già un account? <router-link to="/Login" class="link">Accedi</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const register = () => {
  errorMessage.value = ''; // Reset errore prima di iniziare

  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      console.log("Registrazione avvenuta!");
      router.push('/SurveyCreator');
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage.value = "Questa email è già registrata.";
          break;
        case 'auth/invalid-email':
          errorMessage.value = "L'email inserita non è valida.";
          break;
        case 'auth/weak-password':
          errorMessage.value = "La password è troppo debole. Deve contenere almeno 6 caratteri.";
          break;
        default:
          console.error("Errore imprevisto:", error.code);
          errorMessage.value = "Si è verificato un errore: " + error.message;
      }
    });
};

// Funzione per registrazione con Google
const registerWithGoogle = async () => {
  errorMessage.value = ''; // Reset errore prima di iniziare
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    // L'utente è stato registrato con successo con Google
    console.log('Google user:', result.user);
    router.push('/SurveyCreator');
  } catch (error) {
    console.error("Errore Google login:", error);
    errorMessage.value = "Si è verificato un errore durante la registrazione con Google.";
  }
};
</script>

<style scoped>
.error-message {
  color: #d32f2f;
  background-color: #fce4ec;
  padding: 10px;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 0.95rem;
}

.register-container {
  background-color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
}

.content {
  text-align: center;
  background-color: #f5f3ff;
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

.input {
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 95%;
}

.btn {
  padding: 12px 25px;
  background-color: #8e7cc3;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 100%;
}

.btn:hover {
  background-color: #7a68a1;
  transform: scale(1.05);
}

.btn:focus {
  outline: none;
}

.alternative {
  margin-top: 20px;
  font-size: 1rem;
  color: #333;
}

.link {
  color: #8e7cc3;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.btn-google {
  padding: 12px 25px;
  background-color: #db4437; /* Google Red */
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 100%;
  margin-top: 10px;
}

.btn-google:hover {
  background-color: #c1351d;
}

.btn-google:focus {
  outline: none;
}
</style>
