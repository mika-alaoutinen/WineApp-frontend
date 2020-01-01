const WineStore = {
    data: {
        wines: [],

        searched: {
            searchDone: false,
            wines: [],
        },

        // Used in Service.js to determine the store type.
        storeType: "wine",
    },

    addAll(wineArray) {
        this.data.wines = wineArray;
    },

    addAllFound(wineArray) {
        this.data.searched.wines = wineArray;
        this.data.searched.searchDone = true;
    },

    add(newWine) {
        if (!this.data.wines.some(wine => wine.id === newWine.id)) {
            this.data.wines.push(newWine);
            return true;
        }
        return false; // Wine was not added
    },

    edit(id, editedWine) {
        this.data.wines.map(wine => wine.id === id ? editedWine : wine)
    },
    
    delete(id) {
        this.data.wines = this.data.wines.filter(wine => wine.id !== id);
    },
};

export default WineStore;