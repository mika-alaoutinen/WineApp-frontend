import axios from "axios";
import WineStore from "@/stores/WineStore.js";

const baseUrl = "http://localhost:8080/api/wines/";

class WineService {
    constructor() {
        this.wineStore = WineStore;
    }

    /**
     * @returns WineStore data, i.e. an array of wines.
     */
    getWineStore() {
        return this.wineStore.data;
    }

    async getWineCount() {
        return axios.get(baseUrl + "count")
                    .catch(error => console.log(error));
    }

    getFromWineStore(id) {
        return Array.from(this.wineStore.data.wines)
                    .find(wine => wine.id == id);
    }

    // TODO: how to send search params?
    async searchWines(searchParams) {
        return axios.get(baseUrl + "search?" + buildQueryParams(searchParams))
                    .catch(error => console.log(error));
    }

    /**
     * Add all wines received from the backend to wineStore.
     */
    async getWines() {
        axios.get(baseUrl)
             .then(response => this.wineStore.addAll(response.data))
             .catch(error => console.log(error));
    }

    /**
     * Send a new wine to backend for persisting.
     * @param {Wine} wine 
     */
    async postWine(wine) {
        axios.post(baseUrl, wine)
             .then(response => this.wineStore.addWine(response.data))
             .catch(error => console.log(error));
    }

    /**
     * Send an edite wine to backend for persisting.
     * @param {Number} id 
     * @param {Wine} editedWine 
     */
    async putWine(id, editedWine) {
        axios.put(baseUrl + id, editedWine)
             .then(response => this.wineStore.editWine(id, response))
             .catch((error) => console.log(error));
    }

    /**
     * Sends a delete request to backend.
     * @param {Number} id 
     */
    async deleteWine(id) {
        axios.delete(baseUrl + id)
             .then(() => this.wineStore.deleteWine(id))
             .catch(error => console.log(error));
    }
}

// Private helper functions:

/**
 * Parses searchParams object and builds a query params string from it.
 * @param {Object} searchParams
 * @return {String} query string
 */
function buildQueryParams(searchParams) {
    return Object.keys(searchParams)
        .filter(key => searchParams[key].length > 0)
        .map(key => key + "=" + searchParams[key])
        .join("&");
}

export default WineService;