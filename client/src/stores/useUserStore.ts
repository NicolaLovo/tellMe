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
  const decodeTokenClaims = (token: string): TokenPayload | null => {
    try {
      const decoded = jwtDecode(token)
      if (!decoded) {
        return null
      }

      const data = decoded as {
        claims: TokenPayload
      }

      return data.claims
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  }

  const token = localStorage.getItem(LOCALSTORAGE_KEYS.jwtToken)
  const payload = decodeTokenClaims(token ?? '')

  // Retrieve user state from localStorage or set to null if not present
  const user = ref<User | null>(
    payload && token
      ? { uid: payload.uid, email: payload.email, roles: payload.roles, token }
      : null,
  )

  // Login function to set the user and save it in localStorage
  const login = ({ token }: { token: string }): User | null => {
    const payload = decodeTokenClaims(token)

    // Retrieves user state from localStorage or sets it to null if not present
    const data: User | null =
      payload && token
        ? {
            uid: payload.uid,
            email: payload.email,
            roles: payload.roles,
            token,
          }
        : null
    user.value = data

    localStorage.setItem(LOCALSTORAGE_KEYS.jwtToken, token)
    return data
  }

  // Logout function to reset the user and remove it from localStorage
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
