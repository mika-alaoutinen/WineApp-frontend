const ReviewStore = {
  data: {
    reviews: [],
    storeType: 'review', // Used in Service.js to determine the store type.
  },

  addAll(reviewArray) {
    this.data.reviews = reviewArray
  },

  add(newReview) {
    if (!this.data.reviews.some(review => review.id === newReview.id)) {
      this.data.reviews.push(newReview)
      return true
    }
    return false // Review was not added
  },

  edit(id, editedReview) {
    this.data.reviews.map(review => (review.id === id ? editedReview : review))
  },

  delete(id) {
    this.data.reviews = this.data.reviews.filter(review => review.id !== id)
  },
}

export default ReviewStore
