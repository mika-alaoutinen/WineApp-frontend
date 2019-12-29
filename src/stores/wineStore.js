const WineStore = {
    data: {
        wines: [],
        searchedWines: [],
    },

    addAll(wineArray) {
        this.data.wines = wineArray;
    },

    addAllSearchedWines(wineArray) {
        this.data.searchedWines = wineArray;
    },

    addWine(newWine) {
        if (!this.data.wines.some(wine => wine.id === newWine.id)) {
            this.data.wines.push(newWine);
            return true;
        }
        return false; // Wine was not added
    },

    editWine(id, editedWine) {
        this.data.wines.map(wine => wine.id === id ? editedWine : wine)
    },
    
    deleteWine(id) {
        this.data.wines = this.data.wines.filter(wine => wine.id !== id);
    },
};

export default WineStore;