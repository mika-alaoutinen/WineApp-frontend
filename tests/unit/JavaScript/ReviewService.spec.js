import ReviewService from '@/services/ReviewService.js'

const service = new ReviewService()

test('test calculating wine avg ratings', () => {
  const wines = [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
  ]

  const reviews = [
    { rating: 2, wine: wines[0] },
    { rating: 3, wine: wines[0] },
    { rating: 4, wine: wines[0] },
    { rating: 4.5, wine: wines[1] },
    { rating: 4, wine: wines[1] },
    { rating: 5, wine: wines[1] },
  ]

  const result = service.calculateAverageRatings(wines, reviews)

  expect(result[0].avgrating).toBe(3)
  expect(result[1].avgrating).toBe(4.5)
})
