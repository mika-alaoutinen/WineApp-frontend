const basePath = process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/` : 'http://localhost:8080/api/'
const authPath = `${basePath}auth/`
const userPath = `${basePath}users/`
const reviewPath = `${basePath}reviews/`
const winePath = `${basePath}wines/`

export default {
  auth: {
    paths: {
      login: `${authPath}login`,
      register: `${authPath}register`
    }
  },

  user: {
    paths: {
      username: `${userPath}username`
    }
  },

  review: {
    paths: {
      base: reviewPath,
      count: `${reviewPath}count`,
      quicksearch: `${reviewPath}search/`,
      search: `${reviewPath}search?`,
      wineId: `${reviewPath}wine/id/`,
      wineName: `${reviewPath}wine/name/`,
    },

    getQuickSearchUrl(searchParam, count) {
      return this.paths.quicksearch + searchParam + buildQueryLimit(count)
    },

    getSearchUrl(searchParams) {
      return this.paths.search + buildQueryParams(searchParams)
    },
  },

  wine: {
    paths: {
      base: winePath,
      count: `${winePath}count`,
      countries: `${winePath}countries`,
      descriptions: `${winePath}descriptions`,
      foodPairings: `${winePath}food-pairings`,
      search: `${winePath}search?`,
      validate: `${winePath}validate?`,
    },

    getSearchUrl(params) {
      return this.paths.search + buildQueryParams(params)
    },

    getValidateUrl(name) {
      return `${this.paths.validate}name=${name}`
    },
  },
}

/**
 * Creates Authorization header.
 * @returns {Object} header
 */
export function createHeaders() {
  const token = window.localStorage.getItem('token')
  return {
    headers: { Authorization: token }
  }
}

/**
 * Builds a query parameter with optional limit on wanted results.
 * For example "url/endpoint?limit=10" or "url/endpoint".
 * @param {Number} count of wanted results
 * @returns {String} query parameter.
 */
function buildQueryLimit(count) {
  return count !== 0 && count !== null && count !== undefined
    ? `?limit=${count}`
    : ''
}

/**
 * Parses searchParams object and builds a query params string from it.
 * @param {Object} searchParams
 * @returns {String} query string
 */
function buildQueryParams(searchParams) {
  return Object.keys(searchParams)
    .filter(key => searchParams[key].length > 0)
    .map(key => `${key}=${searchParams[key]}`)
    .join('&')
}
