import { LOCALSTORAGE_KEYS } from '@/constants/LOCALSTORAGE_KEYS'
import { TokenPayload } from '@/types/auth/TokenPayload'
import type { User } from '@/types/auth/User'
import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
  const token = localStorage.getItem(LOCALSTORAGE_KEYS.jwtToken)

  const payload: TokenPayload | null = token ? jwtDecode(token) : null

  // Recupera lo stato utente da localStorage o imposta come null se non presente
  const user = ref<User | null>(
    payload && token
      ? { uid: payload.uid, email: payload.email, roles: payload.roles, token }
      : null,
  )

  // Funzione di login per impostare l'utente e salvarlo in localStorage
  const login = (userData: { token: string }) => {
    const payload: TokenPayload | null = token ? jwtDecode(token) : null

    // Recupera lo stato utente da localStorage o imposta come null se non presente
    const data: User | null =
      payload && token
        ? { uid: payload.uid, email: payload.email, roles: payload.roles, token }
        : null
    user.value = data

    localStorage.setItem(LOCALSTORAGE_KEYS.jwtToken, userData.token)
  }

  // Funzione di logout per resettare l'utente e rimuoverlo da localStorage
  const logout = () => {
    user.value = null
    localStorage.removeItem(LOCALSTORAGE_KEYS.jwtToken)
  }

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
