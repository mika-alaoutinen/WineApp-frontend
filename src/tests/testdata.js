export const wines = [
  {
    id: 1,
    name: 'Viini 1',
    type: 'RED',
    country: 'Italia',
    price: 8,
    volume: 0.75,
    description: ['keskitanniininen', 'luumuinen'],
    foodPairings: ['seurustelujuoma', 'liharuuat'],
    url: 'http://viini.fi',
    reviews: [],
  },
  {
    id: 2,
    name: 'Viini 2',
    type: 'RED',
    country: 'Espanja',
    price: 9,
    volume: 0.75,
    description: ['tanniininen', 'tamminen'],
    foodPairings: ['seurustelujuoma', 'liharuuat'],
    url: 'http://viini.fi',
    reviews: [],
  },
]

export const reviews = [
  {
    id: 1,
    author: 'Mika',
    date: '2020-01-05',
    reviewText: 'Viinin 1 arvostelu. Viini on erittäin herkullinen.',
    rating: 4.5,
    wine: wines[0],
  },
  {
    id: 2,
    author: 'Salla',
    date: '2020-01-05',
    reviewText: 'Viinin 1 arvostelu. Viini on kohtuullisen herkullinen.',
    rating: 3.5,
    wine: wines[0],
  },
]

// Empty values should be removed before persisting the item
export const wineWithEmptyValues = {
  name: 'Viini',
  type: 'RED',
  country: 'Italia',
  price: 8,
  volume: 0.75,
  description: ['', 'luumuinen'],
  foodPairings: ['seurustelujuoma', undefined, null],
  url: 'http://viini.fi',
  reviews: [],
}

// Expected outcome of persisting the above wine with empty values
export const expectedWine = {
  name: 'Viini',
  type: 'RED',
  country: 'Italia',
  price: 8,
  volume: 0.75,
  description: ['luumuinen'],
  foodPairings: ['seurustelujuoma'],
  url: 'http://viini.fi',
  reviews: [],
}

// Name is a mandatory field. Wine should not be persisted.
export const invalidWine = {
  name: '',
  type: 'RED',
  country: '',
  price: 8,
  volume: 0.75,
  url: 'http://viini.fi',
  reviews: [],
}

