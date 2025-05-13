<template>
  <div>
    <header class="app-header">
      <button @click="goHome" class="home-btn">Home</button>
      <button v-if="isLoggedIn" @click="logout" class="logout-btn">Logout</button>
    </header>

    <router-view />
  </div>
</template>



<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import router from '@/router';

const goHome = () => {
  router.push('/');
};


export default defineComponent({
  name: 'App',
  setup() {
    const isLoggedIn = ref(false);
    const auth = getAuth();

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user;
      });
    });

    const logout = () => {
      signOut(auth)
        .then(() => {
          console.log('Logout eseguito con successo');
          router.push('/');
        })
        .catch((error) => {
          console.error('Errore durante il logout:', error);
        });
    };

    return {
      isLoggedIn,
      logout,
      goHome
    };
  }
});
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.home-btn {
  background-color: #8e7cc3;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.home-btn:hover {
  background-color: #7a68a1; /* viola leggermente più scuro al passaggio */
  transform: scale(1.1); /* effetto zoom leggero */
}



.logout-btn {
  background-color: #8e7cc3;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.logout-btn:hover {
  background-color: #7a68a1;
  transform: scale(1.1);
}
</style>
