import type { User } from '@/types/auth/User'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

/**
 * A Pinia store for managing user state with persistence.
 *
 * @remarks
 * This store provides reactive state management for user-related data,
 * including login, logout, and user data persistence in localStorage.
 *
 * @example
 * ```typescript
 * import { useUserStore } from '@/stores/user';
 *
 * const userStore = useUserStore();
 * ```
 *
 * @returns An object containing:
 * - `user`: A reactive reference to the current user or `null` if no user is logged in.
 * - `login`: A function to log in a user by setting the `user` state.
 * - `logout`: A function to log out the user by clearing the `user` state.
 */
export const useUserStore = defineStore('user', () => {
  // Recupera lo stato utente da localStorage o imposta come null se non presente
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))

  // Funzione di login per impostare l'utente e salvarlo in localStorage
  const login = (userData: User | null) => {
    user.value = userData
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    } else {
      localStorage.removeItem('user')
    }
  }

  // Funzione di logout per resettare l'utente e rimuoverlo da localStorage
  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  // Verifica e aggiorna il localStorage quando il componente viene montato
  onMounted(() => {
    if (user.value) {
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  })

  return {
    user,
    login,
    logout,
  }
})

//vecchia versione - dovrei aver aggiunto la persistenza

/*import type { User } from '@/types/auth/User'
import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * A Pinia store for managing user state.
 *
 * @remarks
 * This store provides reactive state management for user-related data,
 * including login and logout functionality.
 *
 * @example
 * ```typescript
 * import { useUserStore } from '@/stores/user';
 *
 * const userStore = useUserStore();
 * ```
 *
 * @returns An object containing:
 * - `user`: A reactive reference to the current user or `null` if no user is logged in.
 * - `login`: A function to log in a user by setting the `user` state.
 * - `logout`: A function to log out the user by clearing the `user` state.
 */
/*
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const login = (body: { user: User | null }) => {
    user.value = body.user
  }

  const logout = () => {
    user.value = null
  }

  return {
    user,
    login,
    logout,
  }
})
*/
