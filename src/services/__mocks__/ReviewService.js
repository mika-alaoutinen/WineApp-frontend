import ReviewStore from '@/stores/ReviewStore.js'
import Service from '@/services/Service.js'
import { reviews } from '@/tests/testdata.js'

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

  getByWineId(wineId) {
    return Promise.resolve(reviews)
  }
}

export default ReviewService