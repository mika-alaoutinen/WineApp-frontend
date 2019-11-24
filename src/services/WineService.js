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

    // TODO: fix this.
    getFromWineStore(id) {
        console.log("ID: ", id);
        let foundWine = Array
            .from(this.wineStore.data.wines)
            .find(wine => wine.id == id);
        
        if (foundWine === undefined) {
            this.getWine(id).then(response => foundWine = response)
        }

        return foundWine;
    }

    /**
     * Add all wines received from the backend to wineStore.
     */
    async getWines() {
        axios.get(baseUrl)
            .then(response => this.wineStore.init(response.data))
            .catch(error => console.log(error));
    }

    /**
     * Add a single found wine to wineStore.
     * @param {Number} wine id 
     */
    async getWine(id) {
        console.log("get: ", baseUrl, id);
        axios.get(baseUrl, id)
            .then(response => this.wineStore.addWine(response.data))
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
            .then((response) => this.wineStore.editWine(id, response))
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

export default WineService;