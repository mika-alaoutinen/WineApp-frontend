import axios from 'axios'
import UrlBuilder, { createHeaders } from '@/utilities/UrlBuilder.js'
import { doesObjectContainEmptyValues, removeNullsFromArray } from '@/utilities/Utilities.js'
import { handleError } from '@/utilities/ErrorHandler.js'

class Service {
  constructor(store) {
    this.store = store
    this.storeType = this.store.data.storeType
  }

  getStore() { return this.store }

  // CRUD operations:
  /**
     * Retrieves a single wine from the back-end based on ID.
     * @param {Number} id to retrieve from back-end.
     * @returns {Object} wine or review.
     */
  async get(id) {
    return axios
      .get(UrlBuilder[this.storeType].paths.base + id, createHeaders())
      .then(response => response.data)
      .catch(error => handleError(error.response))
  }

  /**
   * Add all items received from the backend to store.
   */
  async getAll() {
    return axios
      .get(UrlBuilder[this.storeType].paths.base, createHeaders())
      .then(response => this.store.addAll(response.data))
      .catch(error => handleError(error.response))
  }

  /**
     * Sends a new item to backend for persisting.
     * @param {Object} item, either wine or review.
     */
  async post(item) {
    return axios
      .post(UrlBuilder[this.storeType].paths.base, item, createHeaders())
      .then(response => this.store.add(response.data))
      .catch(error => handleError(error.response))
  }

  /**
     * Send an edited item to backend for persisting.
     * @param {Number} id
     * @param {Object} editedItem.
     */
  async put(id, editedItem) {
    return axios
      .put(UrlBuilder[this.storeType].paths.base + id, editedItem, createHeaders())
      .then(response => this.store.edit(id, response.data))
      .catch(error => handleError(error.response))
  }

  /**
     * Sends a delete request to backend.
     * @param {Number} id
     */
  async delete(id) {
    axios
      .delete(UrlBuilder[this.storeType].paths.base + id, createHeaders())
      .then(() => this.store.delete(id))
      .catch(error => handleError(error.response))
  }

  // Other operations:
  /**
     * Gets a count of items in the database.
     */
  async getCount() {
    return axios
      .get(UrlBuilder[this.storeType].paths.count, createHeaders())
      .then(response => response.data)
      .catch(error => handleError(error.response))
  }

  /**
     * Sends a search request to back-end.
     * @param {Object} searchParams
     * @returns {Array} results.
     */
  async search(searchParams) {
    return axios
      .get(UrlBuilder[this.storeType].getSearchUrl(searchParams), createHeaders())
      .then(response => response.data)
      .catch(error => handleError(error.response))
  }

  /**
   * Validates a review or wine object literal.
   * @param {Object} item review or wine
   * @returns {Boolean} valid. If valid, item can be persisted.
   */
  isValid(item) {
    removeNullsFromArray(item)
    return !doesObjectContainEmptyValues(item)
  }
}

export default Service
