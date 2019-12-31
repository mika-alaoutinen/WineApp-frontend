import axios from "axios";
import UrlBuilder from "@/utilities/UrlBuilder.js";

class Service {
    constructor(store) {
        this.store = store;
        this.storeType = this.store.data.storeType;
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
            .get(UrlBuilder[this.storeType].paths.base + id)
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    /**
     * Add all items received from the backend to store.
     */
    async getAll() {
        return axios
            .get(UrlBuilder[this.storeType].paths.base)
            .then(response => this.store.addAll(response.data))
            .catch(error => console.error(error));
    }

    /**
     * Sends a new item to backend for persisting.
     * @param {Object} item, either wine or review.
     */
    async post(item) {
        return axios
            .post(UrlBuilder[this.storeType].paths.base, item)
            .then(response => this.store.add(response.data))
            .catch(error => console.error(error));
    }

    /**
     * Send an edited item to backend for persisting.
     * @param {Number} id 
     * @param {Object} edited item. 
     */
    async putWine(id, editedItem) {
        axios.put(UrlBuilder[this.storeType].paths.base + id, editedItem)
             .then(response => this.store.edit(id, response.data))
             .catch(error => console.error(error));
    }

    /**
     * Sends a delete request to backend.
     * @param {Number} id 
     */
    async delete(id) {
        axios.delete(UrlBuilder[this.storeType].paths.base + id)
             .then(() => this.store.delete(id))
             .catch(error => console.error(error));
    }

// Other operations:
    async getCount() {
        return axios
            .get(UrlBuilder[this.storeType].paths.count)
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    /**
     * Clears all values in a object.
     * @param {Object} searchParams
     */
    resetObject(searchParams) {
        Object.keys(searchParams)
              .map(key => Array.isArray(searchParams[key])
                ? searchParams[key] = []
                : searchParams[key] = "");
    }
}

export default Service;