import UrlBuilder from '@/utilities/UrlBuilder.js'

const wineSearchUrl = UrlBuilder.wine.paths.search
const wineValidateUrl = UrlBuilder.wine.paths.validate
const reviewSearchUrl = UrlBuilder.review.paths.search
const reviewQuickSearchUrl = UrlBuilder.review.paths.quicksearch

let review
let wine

// Reset search params:
beforeEach(() => {
  review = {
    author: '',
    dateRange: [],
    ratingRange: [],
  }

  wine = {
    name: '',
    type: '',
    countries: [],
    priceRange: [],
    volumes: [],
  }
})

describe('Test backend URL for release', () => {
  test('ensure that backend endpoint is set correctly for deployment', () => {
    expect(UrlBuilder.wine.paths.base).toBe('https://maistissa-backend.herokuapp.com/api/wines/')
    expect(UrlBuilder.review.paths.base).toBe('https://maistissa-backend.herokuapp.com/api/reviews/')
  })
})

describe('Review quicksearch', () => {
  test('find best reviews with quick search', () => {
    expect(UrlBuilder.review.getQuickSearchUrl('best')).toBe(`${reviewQuickSearchUrl}best`)
  })

  test('find 10 best reviews with quick search', () => {
    expect(UrlBuilder.review.getQuickSearchUrl('best', 10)).toBe(`${reviewQuickSearchUrl}best?limit=10`)
  })

  test('find worst reviews with quick search', () => {
    expect(UrlBuilder.review.getQuickSearchUrl('worst')).toBe(`${reviewQuickSearchUrl}worst`)
  })

  test('find 10 worst reviews with quick search', () => {
    expect(UrlBuilder.review.getQuickSearchUrl('worst', 10)).toBe(`${reviewQuickSearchUrl}worst?limit=10`)
  })

  test('find newest reviews with quick search', () => {
    expect(UrlBuilder.review.getQuickSearchUrl('newest')).toBe(`${reviewQuickSearchUrl}newest`)
  })

  test('find 10 newest reviews with quick search', () => {
    expect(UrlBuilder.review.getQuickSearchUrl('newest', 10)).toBe(`${reviewQuickSearchUrl}newest?limit=10`)
  })
})

describe('Review search', () => {
  test('review search with empty search parameter', () => {
    expect(UrlBuilder.review.getSearchUrl(review)).toBe(reviewSearchUrl)
  })

  test('review search by author', () => {
    review.author = 'Mika'
    expect(UrlBuilder.review.getSearchUrl(review)).toBe(`${reviewSearchUrl}author=Mika`)
  })

  test('review search by date range', () => {
    review.dateRange = ['2019-01', '2019-12']
    expect(UrlBuilder.review.getSearchUrl(review)).toBe(`${reviewSearchUrl}dateRange=2019-01,2019-12`)
  })

  test('review search by rating range', () => {
    review.ratingRange = ['3', '5']
    expect(UrlBuilder.review.getSearchUrl(review)).toBe(`${reviewSearchUrl}ratingRange=3,5`)
  })

  test('review search by author and date range', () => {
    review.author = 'Mika'
    review.dateRange = ['2019-01', '2019-05']
    const expectedUrl = 'author=Mika&dateRange=2019-01,2019-05'
    expect(UrlBuilder.review.getSearchUrl(review)).toBe(reviewSearchUrl + expectedUrl)
  })

  test('review search by date range and rating range', () => {
    review.dateRange = ['2019-01', '2019-05']
    review.ratingRange = ['1', '3']
    const expectedUrl = 'dateRange=2019-01,2019-05&ratingRange=1,3'
    expect(UrlBuilder.review.getSearchUrl(review)).toBe(reviewSearchUrl + expectedUrl)
  })
})

describe('Wine search', () => {
  test('wine search with empty search parameter', () => {
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(wineSearchUrl)
  })

  test('wine search by name', () => {
    wine.name = 'Kungfu'
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(`${wineSearchUrl}name=Kungfu`)
  })

  test('wine search by type', () => {
    wine.type = 'RED'
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(`${wineSearchUrl}type=RED`)
  })

  test('wine search by country', () => {
    wine.countries = ['Espanja']
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(`${wineSearchUrl}countries=Espanja`)
  })

  test('wine search by two countries', () => {
    wine.countries = ['Espanja', 'Italia']
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(`${wineSearchUrl}countries=Espanja,Italia`)
  })

  test('wine search by price range cheaper than 10', () => {
    wine.priceRange = [0, 10]
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(`${wineSearchUrl}priceRange=0,10`)
  })

  test('wine search by price range more expensive than 15', () => {
    wine.priceRange = [15, 50]
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(`${wineSearchUrl}priceRange=15,50`)
  })

  test('wine search by price range between 10 and 20', () => {
    wine.priceRange = [10, 20]
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(`${wineSearchUrl}priceRange=10,20`)
  })

  test('wine search by volume equals 0.75', () => {
    wine.volume = [0.75]
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(`${wineSearchUrl}volume=0.75`)
  })

  test('wine search by volume equals 0.75 or 3', () => {
    wine.volume = [0.75, 3]
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(`${wineSearchUrl}volume=0.75,3`)
  })

  test('wine search by country and volume', () => {
    wine.countries = ['Italia']
    wine.volume = [0.75]
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(`${wineSearchUrl}countries=Italia&volume=0.75`)
  })

  test('wine search by type and price range between 7 and 12', () => {
    wine.type = 'WHITE'
    wine.priceRange = [7, 12]
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(`${wineSearchUrl}type=WHITE&priceRange=7,12`)
  })

  test('wine search by countries, price range and volume', () => {
    wine.countries = ['Italia', 'Espanja']
    wine.priceRange = [5, 10]
    wine.volume = [2, 3]
    const expectedUrl = 'countries=Italia,Espanja&priceRange=5,10&volume=2,3'
    expect(UrlBuilder.wine.getSearchUrl(wine)).toBe(wineSearchUrl + expectedUrl)
  })

  describe('Wine name validation', () => {
    test('name url', () => {
      const expectedQueryParam = 'name=Viini'
      expect(UrlBuilder.wine.getValidateUrl('Viini')).toBe(wineValidateUrl + expectedQueryParam)
    })
  })
})
