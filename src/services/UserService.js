import axios from 'axios'
import UrlBuilder, { createHeaders } from '@/utilities/UrlBuilder.js'
import { handleError } from '@/utilities/ErrorHandler.js'

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
 * Calls backend to see if user can edit or delete a review or wine.
 * @param {Object} item review or wine
 * @returns boolean indicating if user can edit or delete item
 */
export async function canUserEdit(item) {
  const type = getItemType(item)
  const url = UrlBuilder[type].isEditable(item.id)

  return axios
    .get(url, createHeaders())
    .then(response => response.data)
    .catch(error => handleError(error))
}

function getItemType(item) {
  if (item.author) {
    return 'review'
  } else if (item.name) {
    return 'wine'
  } else {
    console.log('Unknown item in DetailsButtons:', item)
    return false
  }
}