import axios from "axios";
import ReviewStore from "@/stores/ReviewStore.js";

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

    async getNewestReviews(count) {
        const queryParam = count !== 0 && count !== null && count !== undefined
            ? "newest?limit=" + count
            : "newest";

        return axios
            .get(baseUrl + queryParam)
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    async searchReviews(searchParams) {
        return axios
            .get(baseUrl + "search?" + buildQueryParams(searchParams))
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    async quickSearch(searchParam) {
        return axios
            .get(baseUrl + "quickSearch/" + searchParam)
            .then(response => response.data)
            .catch(error => console.error(error));
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

export default ReviewService;