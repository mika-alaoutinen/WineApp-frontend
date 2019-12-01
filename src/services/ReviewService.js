import axios from "axios";
import ReviewStore from "@/stores/ReviewStore.js";

const baseUrl = "http://localhost:8080/api/reviews/";

class ReviewService {
    constructor() {
        this.reviewStore = ReviewStore;
    }

    async getReviewCount() {
        return axios.get(baseUrl + "count")
                    .catch(error => console.log(error));
    }
}

export default ReviewService;