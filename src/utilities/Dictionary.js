/**
 * Dictionary for translating the English wine and review attributes to Finnish.
 */
export default {
    data: {
        common: {
            home: "Aloitus",
            reviews: "Arvostelut",
            wines: "Viinit",
            'add-wine': "Lisää viini",
            search: "Haku",
        },

        review: {
            author: "Arvostelija",
            date: "Päivämäärä",
            reviewtext: "Arvostelu",
            rating: "Arvosana",
            wine: "Viini",
        },

        wine: {
            name: "Nimi",
            type: "Tyyppi",
            country: "Maa",
            price: "Hinta (€)",
            volume: "Määrä (l)",
            description: "Kuvaus",
            foodpairings: "Sopii nautittavaksi",
            url: "URL",

            sparkling: "Kuohuviini",
            red: "Punaviini",
            rose: "Roseeviini",
            white: "Valkoviini",
            other: "Muu viini",
        },
    },

    translate(object, word) {
        return this.data[object][word.toLowerCase()];
    }
};