const WineStore = {
    data: {
        wines: []
    },

    addAll(wineArray) {
        this.data.wines = wineArray;
    },

    addWine(newWine) {
        if (!this.data.wines.some(wine => wine.id === newWine.id)) {
            this.data.wines.push(newWine);
        }
    },

    editWine(id, editedWine) {
        this.data.wines.map(wine => wine.id === id ? editedWine : wine)
    },
    
    deleteWine(id) {
        this.data.wines = this.data.wines.filter(wine => wine.id !== id);
    },
};

export default WineStore;