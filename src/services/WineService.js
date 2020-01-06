import axios from "axios";
import Service from "./Service.js";
import UrlBuilder from "@/utilities/UrlBuilder.js";
import WineStore from "@/stores/WineStore.js";

class WineService extends Service {
    constructor() {
        super(WineStore);
        this.storeType = "wine"
    }

    /**
     * Gets all unique countries as Array.
     * @returns {Promise} containing array of unique countries.
     */
    getCountries() {
        return getDistinctItems("countries");
    }

    /**
     * Gets all unique wine descriptions as Array.
     * @returns {Promise} containing array of unique descriptions.
     */
    getDescriptions() {
        return getDistinctItems("descriptions");
    }

    /**
     * Gets all unique food pairings as Array.
     * @returns {Promise} containing array of unique food pairings.
     */
    getFoodPairings() {
        return getDistinctItems("foodPairings");
    }
}

/**
 * Requests a list of unique items from the back-end.
 * @param {String} item to request.
 */
async function getDistinctItems (item) {
    return axios
        .get(UrlBuilder.wine.paths[item])
        .then(response => response.data)
        .catch(error => console.error(error));
}

export default WineService;