export const wineStore = {
    state: {
      wines: [],
    },
    init(wineArray) {
        this.state.wines = wineArray;
    },
    addWine(newWine) {
      this.state.wines.push(newWine);
    },
    deleteWine(id) {
        this.state.wines = this.state.wines.filter(wine => wine.id !== id);
    },
};