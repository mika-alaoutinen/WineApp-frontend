/**
 * Dictionary for translating the English wine and review attributes to Finnish.
 */
const dictionary = {
  common: {
    add: 'Lisää uusi',
    home: 'Aloitus',
    login: 'Kirjaudu sisään',
    reviews: 'Arvostelut',
    search: 'Haku',
    user: 'Käyttäjä',
    wines: 'Viinit',
  },

  review: {
    author: 'Arvostelija',
    date: 'Päivämäärä',
    reviewtext: 'Arvostelu',
    rating: 'Arvosana',
    wine: 'Viini',
  },

  wine: {
    name: 'Nimi',
    type: 'Tyyppi',
    country: 'Maa',
    price: 'Hinta (€)',
    volume: 'Määrä (l)',
    description: 'Kuvaus',
    foodpairings: 'Sopii nautittavaksi',
    url: 'URL',

    sparkling: 'Kuohuviini',
    red: 'Punaviini',
    rose: 'Roseeviini',
    white: 'Valkoviini',
    other: 'Muu viini',

    avgrating: 'Arvosana',
    bag: 'Pussi',
    bottle: 'Pullo',
    box: 'Tonkka',
  },

  user: {
    username: 'Käyttäjätunnus',
    password: 'Salasana',
  },
}

export default {
  /**
   * Takes a date string in yyyy-mm-dd format and converts it into dd.mm.yyyy.
   * @param {String} date.
   * @returns {String} formatted date.
   */
  formatDate(date) {
    const dateArray = Array.from(date.split('-'))

    if (dateArray.length !== 3) {
      console.error(`Could not format date: ${date}`)
      return undefined
    }

    return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`
  },

  /**
   * Translates a given word from English to Finnish.
   * @param {String} object the word belongs to. Options are 'common', 'review' and 'wine'.
   * @param {String} word the word to be translated.
   * @returns {String} translated word or blank if translation is not found.
   */
  translate(object, word) {
    const faultyInputs = [null, undefined, '']

    if (faultyInputs.includes(object)) {
      console.error(`Faulty object given to Dictionary.translate: ${object}`)
    } else if (faultyInputs.includes(word)) {
      console.error(`Faulty word given to Dictionary.translate: ${word}`)
    } else {
      const translation = dictionary[object][word.toLowerCase()]

      return translation === undefined
        ? console.error(`Could not find translation for '${object}.${word}'.`)
        : translation
    }
  },
}

/**
* Deep copies an object into a new independent instance of the same object.
* @param {Object} object to be copied
* @returns {Object} identical copy of the object
*/
export function deepCopy(object) {
  return JSON.parse(JSON.stringify(object))
}

/**
 * Checks object literal for empty values and returns outcome as Boolean.
 * @param {Object} object literal, either review or wine.
 * @returns {Boolean} true if there are empty values, else false.
 */
export function doesObjectContainEmptyValues(object) {
  return Object
    .values(object)
    .some(value => value === '')
}

/**
 * Iterates though object's fields, looks for arrays and removes null values from them.
 * @param {Object} object literal with array fields, either review or wine.
 */
export function removeNullsFromArray(object) {
  return Object
    .keys(object)
    .filter(key => Array.isArray(object[key]))
    .map(key => object[key] = object[key].filter(item => item))
}

/**
 * Removes the ID property of an item so that it is not displayed in views.
 * @param {Object} object, either wine or review.
 * @returns {Object} item with ID removed.
 */
export function removeObjectId(object) {
  const copy = { ...object }
  delete copy.id
  return copy
}

/**
 * Clears all values in a object.
 * @param {Object} searchParams
 */
export function resetObject(searchParams) {
  Object.keys(searchParams)
    .map(key => (Array.isArray(searchParams[key])
      ? searchParams[key] = []
      : searchParams[key] = ''))
}