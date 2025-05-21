/**
 * Checks if the provided email string is a valid email address.
 *
 * Uses a regular expression to validate the general structure of an email address,
 * ensuring it contains a local part, an "@" symbol, and a valid domain.
 *
 * @param email - The email address string to validate.
 * @returns `true` if the email is valid, `false` otherwise.
 */
export const isEmailValid = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}
