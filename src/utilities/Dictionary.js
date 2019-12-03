/**
 * Dictionary for translating the English wine attributes to Finnish.
 */
export default {
    data: {
        // Wine attributes:
        name: "Nimi",
        type: "Tyyppi",
        country: "Maa",
        price: "Hinta (€)",
        quantity: "Määrä (l)",
        description: "Kuvaus",
        foodPairings: "Sopii nautittavaksi",
        url: "URL",
        
        // Wine types
        sparkling: "Kuohuviini",
        red: "Punaviini",
        rose: "Roseviini",
        white: "Valkoviini",
        other: "Muu viini"
    },

    translate(word) {
        return this.data[word];
    }
};