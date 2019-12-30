import axios from "axios";
import ReviewStore from "@/stores/ReviewStore.js";
import Service from "./Service.js";
import UrlBuilder from "@/utilities/UrlBuilder.js";

class ReviewService extends Service {
    constructor() {
        super(ReviewStore);
    }

// CRUD operations:
    /**
     * Add all reviews received from the backend to store.
     */
    async getReviews() {
        return axios
            .get(UrlBuilder.review.paths.base)
            .then(response => super.getStore().addAll(response.data))
            .catch(error => console.error(error));
    }

    /**
     * Sends a new review to backend for persisting.
     * @param {Object} review.
     */
    async postReview(review) {
        return axios
            .post(UrlBuilder.review.paths.base, review)
            .then(response => super.getStore().addReview(response.data))
            .catch(error => console.error(error));
    }

    /**
     * Send an edited review to backend for persisting.
     * @param {Number} id 
     * @param {Object} editedReview
     */
    async putWine(id, editedReview) {
        axios.put(UrlBuilder.review.paths.base + id, editedReview)
            .then(response => super.getStore().editReview(id, response.data))
            .catch(error => console.error(error));
    }

    /**
     * Sends a delete request to backend.
     * @param {Number} id 
     */
    async deleteReview(id) {
        axios.delete(UrlBuilder.review.paths.base + id)
            .then(() => super.getStore().deleteReview(id))
            .catch(error => console.error(error));
    }

// Other operations:
    async getReviewCount() {
        return axios
            .get(UrlBuilder.review.paths.count)
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

    /**
     * Saves review search results into the store.
     * @param {Array} reviews.
     */
    saveSearchResults(reviews) {
        super.getStore().addAllSearchedReviews(reviews);
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