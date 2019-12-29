import axios from "axios";
import UrlBuilder from "@/utilities/UrlBuilder.js";
import WineStore from "@/stores/WineStore.js";

class WineService {
    constructor() {
        this.wineStore = WineStore;
    }

// CRUD operations:
    /**
     * Add all wines received from the backend to wineStore.
     */
    async getWines() {
        axios.get(UrlBuilder.wine.paths.base)
             .then(response => this.wineStore.addAll(response.data))
             .catch(error => console.error(error));
    }

    /**
     * Sends a new wine to backend for persisting.
     * @param {Wine} wine 
     */
    async postWine(wine) {
        return axios
            .post(UrlBuilder.wine.paths.base, wine)
            .then(response => this.wineStore.addWine(response.data))
            .catch(error => console.error(error));
    }

    /**
     * Send an edited wine to backend for persisting.
     * @param {Number} id 
     * @param {Wine} editedWine 
     */
    async putWine(id, editedWine) {
        axios.put(UrlBuilder.wine.paths.base + id, editedWine)
             .then(response => this.wineStore.editWine(id, response))
             .catch(error => console.error(error));
    }

    /**
     * Sends a delete request to backend.
     * @param {Number} id 
     */
    async deleteWine(id) {
        axios.delete(UrlBuilder.wine.paths.base + id)
             .then(() => this.wineStore.deleteWine(id))
             .catch(error => console.error(error));
    }

// Other operations:
    async getWineCount() {
        return axios
            .get(UrlBuilder.wine.paths.count)
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    /**
     * Does a search on backend for wines.
     * @param {Object} searchParams describing the types of wines to search for.
     * @returns {Array} found wines.
     */
    async search(searchParams) {
        return axios
            .get(UrlBuilder.wine.getSearchUrl(searchParams))
            .then(response => response.data)
            .catch(error => console.error(error));
    }

// Winestore related functions:
    /**
     * @returns WineStore data, i.e. an array of wines.
     */
    getWineStore() {
        return this.wineStore.data;
    }

    getFromWineStore(id) {
        return Array
            .from(this.wineStore.data.wines)
            .find(wine => wine.id == id);
    }

    /**
     * Saves wines into wine store.
     * @param {String} storeName should be "wines" or "searchedWines".
     * @param {Array} wines to save to the store.
     */
    saveToWineStore(storeName, wines) {
        if (storeName === "wines") {
            this.wineStore.addAll(wines)
        } else if (storeName === "searchedWines") {
            this.wineStore.addAllSearchedWines(wines)
        } else {
            console.error("Could not find data store '" + storeName + "'.");
        }
    }
}

export default WineService;