import ReviewStore from '../../stores/ReviewStore'
import Service from '../Service.js'
import { reviews } from '../../tests/testdata.js'

class ReviewService extends Service {
  constructor() {
    super(ReviewStore)
  }

  getAll() {
    return Promise.resolve(reviews)
  }

  get(id) {
    return Promise.resolve(reviews.find(review => review.id === id))
  }
}

export default ReviewService