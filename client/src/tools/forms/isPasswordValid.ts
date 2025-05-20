/**
 * Checks if a password is valid based on the following criteria:
 * - Contains at least one digit (0-9)
 * - Contains at least one special character (e.g., !@#$%^&*()_+-=[]{};':"\\|,.<>/?)
 * - Has a minimum length of 6 characters
 *
 * @param password - The password string to validate.
 * @returns `true` if the password meets all criteria, otherwise `false`.
 */
export const isPasswordValid = (password: string) => {
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/
  return regex.test(password)
}
