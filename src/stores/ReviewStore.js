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

    addReview(newReview) {
        if (!this.data.reviews.some(review => review.id === newReview.id)) {
            this.data.reviews.push(newReview);
            return true;
        }
        return false; // Review was not added
    },

    editReview(id, editedReview) {
        this.data.reviews.map(review => review.id === id ? editedReview : review)
    },
    
    deleteReview(id) {
        this.data.reviews = this.data.reviews.filter(review => review.id !== id);
    },
};

export default ReviewStore;