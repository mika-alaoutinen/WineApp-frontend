const WineStore = {
    data: {
        wines: [],
    },
    init(wineArray) {
        this.data.wines = wineArray;
    },
    addWine(newWine) {
        this.data.wines.push(newWine);
    },
    deleteWine(id) {
        this.data.wines = this.state.wines.filter(wine => wine.id !== id);
    },
};

export default WineStore;