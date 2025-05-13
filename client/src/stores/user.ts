import type { User } from '@/types/auth/User'
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
