import axios from 'axios'
import UrlBuilder, { createHeaders } from '@/utilities/UrlBuilder.js'
import WineStore from '@/stores/WineStore.js'
import Service from './Service.js'
import { handleError } from '@/utilities/ErrorHandler.js'

class WineService extends Service {
  constructor() {
    super(WineStore)
  }

  /**
     * Gets all unique countries as Array.
     * @returns {Promise} containing Array of unique countries.
     */
  getCountries() {
    return getDistinctItems('countries', createHeaders())
  }

  /**
     * Gets all unique wine descriptions as Array.
     * @returns {Promise} containing Array of unique descriptions.
     */
  getDescriptions() {
    return getDistinctItems('descriptions', createHeaders())
  }

  /**
     * Gets all unique food pairings as Array.
     * @returns {Promise} containing Array of unique food pairings.
     */
  getFoodPairings() {
    return getDistinctItems('foodPairings', createHeaders())
  }

  /**
   * Checks that wine name is unique. Returns true if name is valid, else returns false.
   * @param {string} name of wine
   * @returns {Promise} boolean name is valid
   */
  async validateWineName(name) {
    return axios
      .get(UrlBuilder.wine.getValidateUrl(name), createHeaders())
      .then(response => response.data)
      .catch(error => handleError(error.response))
  }
}

/**
 * Requests a list of unique items from the back-end.
 * @param {String} item to request.
 * @returns {Promise} containing Array of Strings.
 */
async function getDistinctItems(item, headers) {
  return axios
    .get(UrlBuilder.wine.paths[item], headers)
    .then(response => response.data)
    .catch(error => handleError(error.response))
}

export default WineService
