import axios from "axios";
import Service from "./Service.js";
import UrlBuilder from "@/utilities/UrlBuilder.js";
import WineStore from "@/stores/WineStore.js";

class WineService extends Service {
    constructor() {
        super(WineStore);
    }

// CRUD operations:
    /**
     * Add all wines received from the backend to store.
     */
    async getWines() {
        return axios
            .get(UrlBuilder.wine.paths.base)
            .then(response => super.getStore().addAll(response.data))
            .catch(error => console.error(error));
    }

    /**
     * Sends a new wine to backend for persisting.
     * @param {Wine} wine 
     */
    async postWine(wine) {
        return axios
            .post(UrlBuilder.wine.paths.base, wine)
            .then(response => super.getStore().addWine(response.data))
            .catch(error => console.error(error));
    }

    /**
     * Send an edited wine to backend for persisting.
     * @param {Number} id 
     * @param {Wine} editedWine 
     */
    async putWine(id, editedWine) {
        axios.put(UrlBuilder.wine.paths.base + id, editedWine)
             .then(response => super.getStore().editWine(id, response.data))
             .catch(error => console.error(error));
    }

    /**
     * Sends a delete request to backend.
     * @param {Number} id 
     */
    async deleteWine(id) {
        axios.delete(UrlBuilder.wine.paths.base + id)
             .then(() => super.getStore().deleteWine(id))
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
    getFromWineStore(id) {
        return Array
            .from(super.getStore().data.wines)
            .find(wine => wine.id == id);
    }

    /**
     * Saves wine search results into the store.
     * @param {Array} wines.
     */
    saveSearchResults(wines) {
        super.getStore().addAllSearchedWines(wines);
    }
}

export default WineService;