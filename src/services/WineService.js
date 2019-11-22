"use strict"

import axios from "axios";

const baseUrl = "http://localhost:8080/api/wines/";

export class WineService {
    
    async getWines() {
        axios.get(baseUrl)
            .then((response) => this.wines = response.data)
            .catch((error) => console.log(error));
    }

    async getWine(id) {
        axios.get(baseUrl + id)
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
    }

    async deleteWine(id) {
        axios.delete(baseUrl + id)
            .then(() => this.wines.filter(wine => wine.id !== id))
            .catch((error) => console.log(error));
    }
}