export const store = {
    state: {
      wines: []
    },
    addAll(wines) {
        this.state.wines.concat(wines);
    },
    addWine(newWine) {
      this.state.wines.push(newWine);
    },
    deleteWine(id) {
        this.state.wines = this.state.wines.filter(wine => wine.id !== id);
    }
};