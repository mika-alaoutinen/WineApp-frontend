export const wineStore = {
    wines: [],
    state: {
      wines: []
    },
    addAll(wineArray) {
        this.state.wines.concat(wineArray);
    },
    addWine(newWine) {
      this.state.wines.push(newWine);
    },
    deleteWine(id) {
        this.state.wines = this.state.wines.filter(wine => wine.id !== id);
    }
};