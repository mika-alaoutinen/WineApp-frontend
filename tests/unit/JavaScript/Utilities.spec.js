import Utilities from '@/utilities/Utilities.js'

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
