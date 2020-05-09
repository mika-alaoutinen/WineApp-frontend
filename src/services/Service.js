import axios from 'axios'
import UrlBuilder from '@/utilities/UrlBuilder.js'

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
      .get(UrlBuilder[this.storeType].paths.base + id, this.createHeaders())
      .then(response => response.data)
      .catch(error => console.error(error))
  }

  /**
     * Add all items received from the backend to store.
     */
  async getAll() {
    return axios
      .get(UrlBuilder[this.storeType].paths.base, this.createHeaders())
      .then(response => this.store.addAll(response.data))
      .catch(error => console.error(error))
  }

  /**
     * Sends a new item to backend for persisting.
     * @param {Object} item, either wine or review.
     */
  async post(item) {
    return axios
      .post(UrlBuilder[this.storeType].paths.base, item, this.createHeaders())
      .then(response => this.store.add(response.data))
      .catch(error => console.error(error))
  }

  /**
     * Send an edited item to backend for persisting.
     * @param {Number} id
     * @param {Object} editedItem.
     */
  async put(id, editedItem) {
    axios.put(UrlBuilder[this.storeType].paths.base + id, editedItem, this.createHeaders())
      .then(response => this.store.edit(id, response.data))
      .catch(error => console.error(error))
  }

  /**
     * Sends a delete request to backend.
     * @param {Number} id
     */
  async delete(id) {
    axios.delete(UrlBuilder[this.storeType].paths.base + id, this.createHeaders())
      .then(() => this.store.delete(id))
      .catch(error => console.error(error))
  }

  // Other operations:
  /**
     * Gets a count of items in the database.
     */
  async getCount() {
    return axios
      .get(UrlBuilder[this.storeType].paths.count, this.createHeaders())
      .then(response => response.data)
      .catch(error => console.error(error))
  }

  /**
     * Sends a search request to back-end.
     * @param {Object} searchParams
     * @returns {Array} results.
     */
  async search(searchParams) {
    return axios
      .get(UrlBuilder[this.storeType].getSearchUrl(searchParams), this.createHeaders())
      .then(response => response.data)
      .catch(error => console.error(error))
  }

  // Modifying objects:
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

  // Create Authorization header
  createHeaders() {
    const token = window.localStorage.getItem('token')
    return {
      headers: { Authorization: token }
    }
  }
}

export default Service
