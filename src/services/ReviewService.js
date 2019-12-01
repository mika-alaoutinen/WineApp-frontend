import axios from "axios";

const baseUrl = "http://localhost:8080/api/reviews/";

class ReviewService {
    constructor() {
    }

    async getReviewCount() {
        return axios.get(baseUrl + "count")
                    .catch(error => console.log(error));
    }
}

export default ReviewService;