import ReviewDetails from '@/components/review/ReviewDetails.vue'
import { mountVuetifyComponent } from '@/tests/index.js'
import { reviews } from '@/tests/testdata.js'

jest.mock('@/services/ReviewService')

const review = reviews[0]
const wrapper = mountVuetifyComponent(ReviewDetails, { reviewId: review.id })

// Wait until async component mount operation is done:
beforeAll(async () => await wrapper.vm.$nextTick())

describe('Component mount', () => {
  test('reviewId is given', () => {
    expect(wrapper.props('reviewId')).toBe(review.id)
  })

  test('review is set to data on component mount', () => {
    expect(wrapper.vm.review).toBe(review)
  })
})

describe('Check that review columns have a header and a value', () => {
  test('author row', () => {
    validateColumns('#author', 'Arvostelija', review.author)
  })

  test('date row', () => {
    validateColumns('#date', 'Päivämäärä', '05.01.2020')
  })

  test('review text row', () => {
    validateColumns('#reviewText', 'Arvostelu', review.reviewText)
  })

  test('rating row', () => {
    validateColumns('#rating', 'Arvosana', review.rating.toString())
  })

  test('wine row', () => {
    validateColumns('#wine', 'Viini', review.wine.name)
  })
})

// Utility functions:
const validateColumns = (identifier, col1Value, col2Value) => {
  const columns = wrapper.find(identifier).findAll('.col')
  expect(columns.length).toBe(2)
  expect(columns.at(0).text()).toBe(col1Value)
  expect(columns.at(1).text()).toBe(col2Value)
}