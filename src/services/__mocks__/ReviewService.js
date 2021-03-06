import ReviewStore from '@/stores/ReviewStore.js'
import Service from '@/services/Service.js'
import { reviews } from '@/tests/testdata.js'

/**
 * Mock service class. Return test data as Promise.
 */
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

  getCount() {
    return Promise.resolve(reviews.length)
  }

  /**
   * Return true if wineId is 1, else return false.
   * @param {number} wineId
   * @param {Object} review
   */
  post(wineId, review) {
    return Promise.resolve(wineId === 1)
  }

  quickSearch() {
    return Promise.resolve(reviews)
  }

  search(searchParam) {
    return Promise.resolve(reviews)
  }

  getStore() {
    return {
      data: {
        reviews,
        storeType: 'review'
      }
    }
  }
}

export default ReviewService