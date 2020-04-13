import axios from 'axios'
import UrlBuilder from '@/utilities/UrlBuilder.js'
import WineStore from '@/stores/WineStore.js'
import Service from './Service.js'

class WineService extends Service {
  constructor() {
    super(WineStore)
  }

  /**
     * Gets all unique countries as Array.
     * @returns {Promise} containing Array of unique countries.
     */
  getCountries() {
    return getDistinctItems('countries')
  }

  /**
     * Gets all unique wine descriptions as Array.
     * @returns {Promise} containing Array of unique descriptions.
     */
  getDescriptions() {
    return getDistinctItems('descriptions')
  }

  /**
     * Gets all unique food pairings as Array.
     * @returns {Promise} containing Array of unique food pairings.
     */
  getFoodPairings() {
    return getDistinctItems('foodPairings')
  }

  /**
   * Checks that wine name is unique. Returns true if name is valid, else returns false.
   * @param {string} name of wine
   * @returns {Promise} boolean name is valid
   */
  async validateWineName(name) {
    return axios
      .get(UrlBuilder.wine.getValidateUrl(name))
      .then(response => response.data)
      .catch(error => console.error(error))
  }
}

/**
 * Requests a list of unique items from the back-end.
 * @param {String} item to request.
 * @returns {Promise} containing Array of Strings.
 */
async function getDistinctItems(item) {
  return axios
    .get(UrlBuilder.wine.paths[item])
    .then(response => response.data)
    .catch(error => console.error(error))
}

export default WineService
