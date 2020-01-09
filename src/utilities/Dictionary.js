/**
 * Dictionary for translating the English wine and review attributes to Finnish.
 */
const dictionary = {
    common: {
        home: "Aloitus",
        reviews: "Arvostelut",
        wines: "Viinit",
        add: "Lisää uusi",
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

        avgrating: "Arvosana",
        bag: "Pussi",
        bottle: "Pullo",
        box: "Tonkka",
    },
};

/**
 * Translates a given word from English to Finnish.
 * @param {String} object the word belongs to. Options are 'common', 'review' and 'wine'.
 * @param {String} word the word to be translated.
 * @returns {String} translated word or blank if translation is not found.
 */
export default function translate(object, word) {
    const faultyInputs = [null, undefined, ""];

    if (faultyInputs.includes(object)) {
        console.error("Faulty object given to Dictionary.translate: " + object);
    } else if (faultyInputs.includes(word)) {
        console.error("Faulty word given to Dictionary.translate: " + word);
    } else {
        const translation = dictionary[object][word.toLowerCase()];

        return translation === undefined
            ? console.error("Could not find translation for '" + object + "." + word + "'.")
            : translation;
    }
}