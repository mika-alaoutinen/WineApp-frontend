const ReviewStore = {
    data: {
        reviews: []
    },

    addAll(reviewArray) {
        this.data.reviews = reviewArray;
    }
};

export default ReviewStore;