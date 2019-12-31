import axios from "axios";
import Service from "./Service.js";
import UrlBuilder from "@/utilities/UrlBuilder.js";
import WineStore from "@/stores/WineStore.js";

class WineService extends Service {
    constructor() {
        super(WineStore);
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

    /**
     * Saves wine search results into the store.
     * @param {Array} wines.
     */
    saveSearchResults(wines) {
        super.getStore().addAllSearchedWines(wines);
    }
}

export default WineService;