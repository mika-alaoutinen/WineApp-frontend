const ReviewStore = {
    data: {
        reviews: [],

        searched: {
            searchDone: false,
            reviews: [],
        }
    },

    addAll(reviewArray) {
        this.data.reviews = reviewArray;
    },

    addAllSearchedReviews(reviewArray) {
        this.data.searched.reviews = reviewArray;
        this.data.searched.searchDone = true;
    },
};

export default ReviewStore;