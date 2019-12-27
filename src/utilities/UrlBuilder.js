const basePath = "http://localhost:8080/api/";
const winePath = basePath + "wines/";
const reviewPath = basePath + "reviews/";

export default {
    wine: {
        paths: {
            base: winePath,
            count: winePath + "count",
            search: winePath + "search?",
        },

        getSearchUrl(params) {
            return this.paths.search + buildQueryParams(params);
        },
    },

    review: {
        paths: {
            base: reviewPath,
            count: reviewPath + "count",
            quicksearch: reviewPath + "search/",
            // search: reviewPath + "search?",
            search: reviewPath + "rating?",
        },
        
        getQuickSearchUrl(searchParam, count) {
            return this.paths.quicksearch + searchParam + buildQueryLimit(count);
        },

        getSearchUrl(searchParams) {
            return this.paths.search + buildQueryParams(searchParams);
        },
    },
};

/**
 * Builds a query parameter with optional limit on wanted results.
 * For example "url/endpoint?limit=10" or "url/endpoint".
 * @param {Number} count of wanted results
 * @returns query parameter.
 */
function buildQueryLimit(count) {
    return count !== 0 && count !== null && count !== undefined
        ? "?limit=" + count
        : "";
}

/**
 * Parses searchParams object and builds a query params string from it.
 * @param {Object} searchParams
 * @returns {String} query string
 */
function buildQueryParams(searchParams) {
    return Object.keys(searchParams)
        .filter(key => searchParams[key] != "")
        .map(key => key + "=" + searchParams[key])
        .join("&");
}