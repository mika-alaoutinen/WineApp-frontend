import ReviewStore from '../../stores/ReviewStore'
import Service from '../Service.js'
import { reviews } from '../../../tests/testdata.js'

class ReviewService extends Service {
  constructor() {
    super(ReviewStore)
  }

  getAll() {
    return Promise.resolve(reviews)
  }

  get(id) {
    return Promise.resolve(reviews[id])
  }
}

export default ReviewService