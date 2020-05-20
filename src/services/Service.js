import axios from 'axios'
import UrlBuilder, { createHeaders } from '@/utilities/UrlBuilder.js'
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

  // Modifying objects:

  /**
   * Deep copies an object into a new independent instance of the same object.
   * @param {Object} object to be copied
   * @returns {Object} identical copy of the object
   */
  deepCopy(object) {
    return JSON.parse(JSON.stringify(object))
  }

  /**
   * Checks object literal for empty values and returns outcome as Boolean.
   * @param {Object} object literal, either review or wine.
   * @returns {Boolean} true if there are empty values, else false.
   */
  doesObjectContainEmptyValues(object) {
    return Object
      .values(object)
      .some(value => value === '')
  }

  /**
   * Iterates though object's fields, looks for arrays and removes null values from them.
   * @param {Object} object literal with array fields, either review or wine.
   */
  removeNullsFromArray(object) {
    return Object
      .keys(object)
      .filter(key => Array.isArray(object[key]))
      .map(key => object[key] = object[key].filter(item => item))
  }

  /**
     * Removes the ID property of an item so that it is not displayed in views.
     * @param {Object} object, either wine or review.
     * @returns {Object} item with ID removed.
     */
  removeObjectId(object) {
    const copy = { ...object }
    delete copy.id
    return copy
  }

  /**
     * Clears all values in a object.
     * @param {Object} searchParams
     */
  resetObject(searchParams) {
    Object.keys(searchParams)
      .map(key => (Array.isArray(searchParams[key])
        ? searchParams[key] = []
        : searchParams[key] = ''))
  }
}

export default Service
