import axios from "axios";
import ReviewStore from "@/stores/ReviewStore.js";
import UrlBuilder from "@/utilities/UrlBuilder.js";

const baseUrl = "http://localhost:8080/api/reviews/";

class ReviewService {
    constructor() {
        this.reviewStore = ReviewStore;
    }

    async getReviewCount() {
        return axios
            .get(baseUrl + "count")
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    async search(searchParams) {
        return axios
            .get(UrlBuilder.review.getSearchUrl(searchParams))
            .then(response => response.data)
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
}

// Private helper functions:

/**
 * Validates that search param is "best", "worst" or "newest".
 * @param {String} param
 * @returns {Boolean}
 */
function isSearchParamValid(param) {
    return [ "best", "worst", "newest" ].includes(param);
}

export default ReviewService;