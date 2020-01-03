import axios from "axios";
import ReviewStore from "@/stores/ReviewStore.js";
import Service from "./Service.js";
import UrlBuilder from "@/utilities/UrlBuilder.js";

class ReviewService extends Service {
    constructor() {
        super(ReviewStore);
    }

    /**
     * Gets all reviews of a wine by wine ID.
     * @param {Number} wineId 
     * @returns {Array} reviews.
     */
    async getByWineId(wineId) {
        return axios
            .get(UrlBuilder.review.paths.wineId + wineId)
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    /**
     * Sends a new review to backend for persisting.
     * @param {Object} review.
     */
    async post(wineId, item) {
        return axios
            .post(UrlBuilder.review.paths.base + wineId, item)
            .then(response => this.store.add(response.data))
            .catch(error => console.error(error));
    }

    async quickSearch(searchParam, count) {
        if (!isSearchParamValid) {
            console.error("Invalid search param: " + searchParam);
            return;
        }

        return axios
            .get(UrlBuilder.review.getQuickSearchUrl(searchParam, count))
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    calculateAvgRating(reviews) {
        // Map wines and reviews to Map<wineId, Review>:
        const map = new Map(
            reviews.map(review => [review.wine.id, new Array() ]));
        
        reviews.forEach(review => map.get(review.wine.id).push(review));

        console.log(map);
    }
}

/**
 * Validates that search param is "best", "worst" or "newest".
 * @param {String} param
 * @returns {Boolean}
 */
function isSearchParamValid(param) {
    return [ "best", "worst", "newest" ].includes(param);
}

export default ReviewService;