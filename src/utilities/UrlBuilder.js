const basePath = "http://localhost:8080/api/";
const wineBasePath = basePath + "wines/";
const reviewBasePath = basePath + "reviews/";

export default {
    wine: {
        paths: {
            base: wineBasePath,
            count: wineBasePath + "count",
            search: wineBasePath + "search?",
        },

        getSearchUrl(params) {
            const url = this.wine.paths.search + buildQueryParams(params);
            console.log(url);
            return url;
        },
    },

    review: {
        paths: {
            base: reviewBasePath,
            count: reviewBasePath + "count",
            quicksearch: reviewBasePath + "search/",
            // search: reviewBasePath + "search?",
            search: reviewBasePath + "rating?",
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
        // .filter(key => searchParams[key].length > 0)
        .map(key => key + "=" + searchParams[key])
        .join("&");
}