import Utilities, {
  deepCopy, doesObjectContainEmptyValues, getItemType, removeObjectId,
  removeNullsFromArray, resetObject
} from '@/utilities/Utilities.js'

import { reviews, wines } from '../../testdata.js'

describe('date formatter', () => {
  test('test that date format is converted from yyyy-mm-dd to dd.mm.yyyy', () => {
    expect(Utilities.formatDate('2019-10-01')).toBe('01.10.2019')
  })
})

describe('Translating keywords, common', () => {
  test('home', () => {
    expect(Utilities.translate('common', 'home')).toBe('Aloitus')
  })

  test('reviews', () => {
    expect(Utilities.translate('common', 'reviews')).toBe('Arvostelut')
  })

  test('wines', () => {
    expect(Utilities.translate('common', 'wines')).toBe('Viinit')
  })

  test('add', () => {
    expect(Utilities.translate('common', 'add')).toBe('Lisää uusi')
  })

  test('search', () => {
    expect(Utilities.translate('common', 'search')).toBe('Haku')
  })
})

describe('Translating keywords, review', () => {
  test('author', () => {
    expect(Utilities.translate('review', 'author')).toBe('Arvostelija')
  })

  test('date', () => {
    expect(Utilities.translate('review', 'date')).toBe('Päivämäärä')
  })

  test('reviewtext', () => {
    expect(Utilities.translate('review', 'reviewtext')).toBe('Arvostelu')
  })

  test('rating', () => {
    expect(Utilities.translate('review', 'rating')).toBe('Arvosana')
  })

  test('wine', () => {
    expect(Utilities.translate('review', 'wine')).toBe('Viini')
  })
})

describe('Translating keywords, wine', () => {
  test('name', () => {
    expect(Utilities.translate('wine', 'name')).toBe('Nimi')
  })

  test('type', () => {
    expect(Utilities.translate('wine', 'type')).toBe('Tyyppi')
  })

  test('country', () => {
    expect(Utilities.translate('wine', 'country')).toBe('Maa')
  })

  test('price', () => {
    expect(Utilities.translate('wine', 'price')).toBe('Hinta (€)')
  })

  test('volume', () => {
    expect(Utilities.translate('wine', 'volume')).toBe('Määrä (l)')
  })

  test('description', () => {
    expect(Utilities.translate('wine', 'description')).toBe('Kuvaus')
  })

  test('foodpairings', () => {
    expect(Utilities.translate('wine', 'foodpairings')).toBe('Sopii nautittavaksi')
  })

  test('url', () => {
    expect(Utilities.translate('wine', 'url')).toBe('URL')
  })

  test('sparkling', () => {
    expect(Utilities.translate('wine', 'sparkling')).toBe('Kuohuviini')
  })

  test('red', () => {
    expect(Utilities.translate('wine', 'red')).toBe('Punaviini')
  })

  test('rose', () => {
    expect(Utilities.translate('wine', 'rose')).toBe('Roseeviini')
  })

  test('white', () => {
    expect(Utilities.translate('wine', 'white')).toBe('Valkoviini')
  })

  test('other', () => {
    expect(Utilities.translate('wine', 'other')).toBe('Muu viini')
  })

  test('avgrating', () => {
    expect(Utilities.translate('wine', 'avgrating')).toBe('Arvosana')
  })

  test('bag', () => {
    expect(Utilities.translate('wine', 'bag')).toBe('Pussi')
  })

  test('bottle', () => {
    expect(Utilities.translate('wine', 'bottle')).toBe('Pullo')
  })

  test('box', () => {
    expect(Utilities.translate('wine', 'box')).toBe('Tonkka')
  })
})

describe('translation functionality', () => {
  test('test that translate function is case insensitive', () => {
    expect(Utilities.translate('wine', 'nAMe')).toBe('Nimi')
  })
})

describe('Utility functions', () => {
  test('deepCopy return a copy of item', () => {
    const wine = wines[0]
    const copy = deepCopy(wine)
    expect(copy).toEqual(wine)
  })

  test('doesObjectContainEmptyValues returns true if object has empty fields', () => {
    const wine = { name: 'Viini 1', volume: undefined }
    expect(doesObjectContainEmptyValues(wine)).toBe(true)
  })

  test('doesObjectContainEmptyValues returns false if object has no empty fields', () => {
    expect(doesObjectContainEmptyValues(wines[0])).toBe(false)
  })

  test('getItemType recognizes a wine', () => {
    expect(getItemType(wines[0])).toBe('wine')
  })

  test('getItemType recognizes a review', () => {
    expect(getItemType(reviews[0])).toBe('review')
  })

  test('getItemType returns false on unrecognized item', () => {
    const item = { foo: 'bar' }
    expect(getItemType(item)).toBe(false)
  })

  test('removeNullsFromArray removes empty items from an array that is inside an object', () => {
    const item = {
      name: 'item',
      array: [ 1, 2, null, undefined, '', 3 ]
    }
    const expected = {
      name: 'item',
      array: [ 1, 2, 3 ]
    }

    removeNullsFromArray(item)
    expect(item).toStrictEqual(expected)
  })

  test('ID property of object is removed', () => {
    const wine = removeObjectId(wines[0])
    expect(wine.id).toBeUndefined()
  })

  test('objects properties are reset', () => {
    const wine = wines[0]
    resetObject(wine)
    const allPropertiesEmpty = Object
      .values(wine)
      .every(value => value.length < 1)

    expect(allPropertiesEmpty).toBe(true)
  })
})