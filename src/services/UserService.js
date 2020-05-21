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