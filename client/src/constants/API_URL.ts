/**
 * The base URL for the API, which dynamically switches between
 * the development and production environments based on the
 * `import.meta.env.DEV` flag.
 *
 * - In development mode (`import.meta.env.DEV` is `true`), the URL is set to `http://localhost:4000`.
 * - In production mode (`import.meta.env.DEV` is `false`), the URL is set to `https://api.example.com`.
 *
 * This constant is used to configure API requests throughout the application.
 */
export const API_URL = import.meta.env.DEV
  ? 'http://localhost:4000'
  : 'https://backend.tellme.wetambara.com'
