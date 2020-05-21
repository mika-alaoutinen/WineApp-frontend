import axios from 'axios'
import UrlBuilder, { createHeaders } from '@/utilities/UrlBuilder.js'
import { getItemType } from '@/utilities/Utilities.js'
import { handleError } from '@/utilities/ErrorHandler.js'

/**
 * Calls backend to see if user can edit or delete a review or wine.
 * @param {Object} item review or wine
 * @returns boolean indicating if user can edit or delete item
 */
export async function canUserEdit(item) {
  const type = getItemType(item)

  return type
    ? axios
      .get(UrlBuilder[type].isEditable(item.id), createHeaders())
      .then(response => response.data)
      .catch(error => handleError(error))
    : false
}

/**
 * Retrieves the username for the logged in user.
 * @returns {String} username
 */
export async function getUsername() {
  return axios
    .get(UrlBuilder.user.paths.username, createHeaders())
    .then(result => result.data)
    .catch(error => handleError(error.response))
}

/**
 * Queries if user has logged in or not.
 * @returns {Boolean} logged in.
 */
export async function isLoggedIn() {
  return axios
    .get(UrlBuilder.user.paths.loggedIn, createHeaders())
    .then(result => result.data)
    .catch(error => handleError(error.response))
}