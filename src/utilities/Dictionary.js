/**
 * Dictionary for translating the English wine and review attributes to Finnish.
 */
export default {
    // TODO: separate into three objects: wine, review and common.

    data: {
        // Wine attributes:
        name: "Nimi",
        type: "Tyyppi",
        country: "Maa",
        price: "Hinta (€)",
        volume: "Määrä (l)",
        description: "Kuvaus",
        foodpairings: "Sopii nautittavaksi",
        url: "URL",
        
        // Wine types
        sparkling: "Kuohuviini",
        red: "Punaviini",
        rose: "Roseeviini",
        white: "Valkoviini",
        other: "Muu viini",

        // Review attributes:
        author: "Arvostelija",
        date: "Päivämäärä",
        reviewtext: "Arvostelu",
        rating: "Arvosana",
        wine: "Viini",

        // Common properties:
        home: "Aloitus",
        reviews: "Arvostelut",
        wines: "Viinit",
        'add-wine': "Lisää viini",
        search: "Haku",
    },

    translate(word) {
        return this.data[word.toLowerCase()];
    }
};