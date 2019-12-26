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

    async searchReviews(searchParams) {
        return axios
            .get(baseUrl + "search?" + buildQueryParams(searchParams))
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    async quickSearch(searchParam, count) {
        if (!isSearchParamValid) {
            console.error("Invalid search param: " + searchParam);
            return;
        }
        
        console.log(UrlBuilder.review.paths.quicksearch);
        
        // const path = "search/" + searchParam;
        // const queryParam = path + buildQueryLimit(count);

        return axios
            .get(UrlBuilder.review.getQuickSearchUrl(count))
            .then(response => response.data)
            .catch(error => console.error(error));
    }
}

// Private helper functions:

/**
 * Builds a query parameter with optional limit on wanted results.
 * For example "url/endpoint?limit=10" or "url/endpoint".
 * @param {String} url
 * @param {Number} count of wanted results
 * @returns query parameter.
 */
// function buildQueryLimit(url, count) {
//     return count !== 0 && count !== null && count !== undefined
//         ? url + "?limit=" + count
//         : url;
// }

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

/**
 * Validates that search param is "best", "worst" or "newest".
 * @param {String} param
 * @returns {Boolean}
 */
function isSearchParamValid(param) {
    return [ "best", "worst", "newest" ].includes(param);
}

export default ReviewService;