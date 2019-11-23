const WineStore = {
    data: {
        wines: [], // TODO: change to map?
    },
    init(wineArray) {
        this.data.wines = wineArray;
    },
    addWine(newWine) {
        this.data.wines.push(newWine);
    },
    editWine(id, editedWine) {
        this.data.wines.map(wine => wine.id === id ? editedWine : wine)
    },
    deleteWine(id) {
        this.data.wines = this.data.wines.filter(wine => wine.id !== id);
    },
};

export default WineStore;