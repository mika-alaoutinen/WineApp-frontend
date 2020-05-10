import axios from 'axios'
import UrlBuilder from '@/utilities/UrlBuilder.js'

/**
 * Pass user credentials to backend. Returns a JWT token on successful login.
 * Token can be used to access backend services that require authentication,
 * such as write operations to database.
 * @param {Object} credentials containing username and password
 * @returns {Object} JWT token
 */
export async function login(credentials) {
  return axios
    .post(UrlBuilder.auth.paths.login, credentials)
    .then(response => response.data)
    .then(jwtToken => saveToken(jwtToken))
    .catch(error => console.error(error))
}

/**
 * Create and save new user in database. A new user has a default role of ROLE_USER.
 * @param {Object} user with username and password
 * @returns {Object} user
 */
export async function register(user) {
  return axios
    .post(UrlBuilder.auth.paths.register, user)
    .then(response => response.data)
    .catch(error => console.error(error))
}

/**
 * Clears local storage, thus clearing the valid JWT token.
 */
export function logout() {
  window.localStorage.clear()
}

/**
 * Saves a valid JWT token to local storage.
 * @param {Object} jwtToken token
 */
export async function saveToken(jwtToken) {
  const token = `${jwtToken.type} ${jwtToken.token}`
  window.localStorage.setItem('token', token)
  return token
}