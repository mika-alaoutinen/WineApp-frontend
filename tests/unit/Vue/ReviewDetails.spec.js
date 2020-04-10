import ReviewDetails from '@/components/review/ReviewDetails.vue'
import { mountVuetifyComponent } from '../../index.js'
import { reviews } from '../../testdata.js'

jest.mock('@/services/ReviewService')

let review
beforeEach(() => {
  review = reviews[0]
  // wrapper.vm.$data.review = review
})

describe('Sanity check props', () => {
  test('reviewId is given', () => {
    const wrapper = mountComponent()
    expect(wrapper.props('reviewId')).toBe(review.id)
  })
})

describe('Component mount', () => {
  test('review is set to data on component mount', () => {
    const wrapper = mountComponent()
    expect(wrapper.vm.$data.review).toBe(review)
  })
})

describe('Check that review fields are present', () => {
  test('author row contains two columns with header and value fields', () => {
    const wrapper = mountComponent()
    wrapper.vm.$data.review = review
    const authorColumns = wrapper.find('#author').findAll('.col')

    expect(authorColumns.length).toBe(2)
    expect(authorColumns.at(0).text()).toBe('Arvostelija')
    expect(authorColumns.at(1).text()).toBe('Mika')
  })
})

// Utility functions:
function mountComponent() {
  return mountVuetifyComponent(ReviewDetails, { reviewId: review.id })
}