import axios from "axios";

const baseUrl = "http://localhost:8080/api/wines/";

export class WineService {
    constructor(wineStore) {
        this.wineStore = wineStore;
    }

    /**
     * Add all wines received from the backend to wineStore.
     */
    async getWines() {
        axios.get(baseUrl)
            .then((response) => this.wineStore.addAll(response.data))
            .catch((error) => console.log(error));
    }

    /**
     * Add a single found wine to wineStore.
     * @param {Number} wine id 
     */
    async getWine(id) {
        axios.get(baseUrl + id)
            .then((response) => this.wineStore.addWine(response.data))
            .catch((error) => console.log(error));
    }

    /**
     * Send a new wine to backend for persisting.
     * @param {Wine} wine 
     */
    async addWine(wine) {
        axios.post(baseUrl, wine)
            .then((response) => this.wineStore.addWine(response))
            .catch((error) => console.log(error));
    }

    /**
     * Sends a delete request to backend.
     * @param {Number} id 
     */
    async deleteWine(id) {
        axios.delete(baseUrl + id)
            .then(() => this.wineStore.deleteWine(id))
            .catch((error) => console.log(error));
    }
}