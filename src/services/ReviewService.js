import axios from 'axios'
import ReviewStore from '@/stores/ReviewStore.js'
import UrlBuilder, { createHeaders } from '@/utilities/UrlBuilder.js'
import Service from './Service.js'

class ReviewService extends Service {
  constructor() {
    super(ReviewStore)
  }

  /**
     * Gets all reviews of a wine by wine ID.
     * @param {Number} wineId
     * @returns {Array} reviews.
     */
  async getByWineId(wineId) {
    return axios
      .get(UrlBuilder.review.paths.wineId + wineId, createHeaders())
      .then(response => response.data)
      .catch(error => console.error(error))
  }

  /**
     * Sends a new review to backend for persisting.
     * @param {Number} wineId.
     * @param {Object} review.
     */
  async post(wineId, review) {
    return axios
      .post(UrlBuilder.review.paths.base + wineId, review, createHeaders())
      .then(response => this.store.add(response.data))
      .catch(error => console.error(error))
  }

  /**
     * Performs a quick search for newest, best or worst reviews.
     * @param {String} searchParam for backend.
     * @param {Number} count of results wanted.
     */
  async quickSearch(searchParam, count) {
    if (!isSearchParamValid) {
      console.error(`Invalid search param: ${searchParam}`)
      return
    }

    return axios
      .get(UrlBuilder.review.getQuickSearchUrl(searchParam, count), createHeaders())
      .then(response => response.data)
      .catch(error => console.error(error))
  }

  /**
     * Calculates all wines' average ratings and adds the rating as
     * a property to the wine objects.
     * @param {Array} wines
     * @param {Array} reviews
     * @returns {Array} wines with property wine.avgRating added.
     */
  calculateAverageRatings(wines, reviews) {
    const winesCopy = wines.map(wine => ({ ...wine }))

    winesCopy.map(wine => {
      const ratings = reviews
        .filter(review => review.wine.id === wine.id)
        .map(review => review.rating)

      const avgRating = ratings.reduce((prev, current) =>
        prev + current, 0) / ratings.length

      wine.avgrating = Number.isNaN(avgRating) ? '-' : avgRating
    })

    return winesCopy
  }
}

/**
 * Validates that search param is "best", "worst" or "newest".
 * @param {String} param
 * @returns {Boolean}
 */
function isSearchParamValid(param) {
  return ['best', 'worst', 'newest'].includes(param)
}

export default ReviewService
