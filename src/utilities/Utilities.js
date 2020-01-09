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

export default  {
    /**
     * Translates a given word from English to Finnish.
     * @param {String} object the word belongs to. Options are 'common', 'review' and 'wine'.
     * @param {String} word the word to be translated.
     * @returns {String} translated word or blank if translation is not found.
     */
    translate(object, word) {
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
    },

    /**
     * Takes a date string in yyyy-mm-dd format and converts it into dd.mm.yyyy.
     * @param {String} date.
     * @returns {String} formatted date.
     */
    formatDate(date) {
        const dateArray = Array.from(date.split("-"));
        const formatted = dateArray[2] + "." + dateArray[1] + "." + dateArray[0];
        return formatted;
    }
}

