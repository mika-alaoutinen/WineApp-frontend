import axios from 'axios'
import UrlBuilder from '@/utilities/UrlBuilder.js'

/**
 * Pass user credentials to backend. Returns a JWT token on successful login.
 * Token can be used to access backend services that require authentication,
 * such as write operations to database.
 * @param {Object} credentials containing username and password
 * @returns {Object} JWT token
 */
const login = credentials =>
  axios.post(UrlBuilder.auth.paths.login, credentials)
  .then(response => response.data)
  .then(jwtToken => saveToken(jwtToken))
  .catch(error => console.error(error))

/**
 * Create and save new user in database. A new user has a default role of ROLE_USER.
 * @param {Object} user with username and password
 * @returns {Object} user
 */
const register = user =>
  axios.post(UrlBuilder.auth.paths.login, user)
  .then(response => response.data)
  .catch(error => console.error(error))

/**
 * Clears local storage, thus clearing the valid JWT token.
 */
const logout = () => {
    window.localStorage.clear()
    window.localStorage.reload()
  }

/**
 * Saves a valid JWT token to local storage.
 * @param {Object} jwtToken token
 */
const saveToken = jwtToken => {
  const token = JSON.stringify(jwtToken)
  console.log('received token', token)
  window.localStorage.setItem('token', token)
}

export default { login, logout, register }