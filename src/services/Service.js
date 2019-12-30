class Service {
    constructor(store) {
        this.store = store;
    }

    getStore() { return this.store }

    /**
     * Clears all values in a object.
     * @param {Object} searchParams
     */
    resetObject(searchParams) {
        Object.keys(searchParams)
              .map(key => Array.isArray(searchParams[key])
                ? searchParams[key] = []
                : searchParams[key] = "");
    }
}

export default Service;