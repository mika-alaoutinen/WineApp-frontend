import ReviewDetailsCard from '@/components/review/ReviewDetailsCard.vue'
import { mountVuetifyComponent } from '../index.js'
import { reviews } from '../testdata.js'

describe('Check expansion panels', () => {
  test('case no reviews', () => {
    const wrapper = mountComponent()
    expect(wrapper.findAll('.v-expansion-panel').length).toBe(0)
  })

  test('case at least one review', () => {
    const wrapper = mountComponent(reviews)
    expect(wrapper.findAll('.v-expansion-panel').length).toBe(reviews.length)
  })
})

describe('Check props', () => {
  test('reviews prop is received correctly', () => {
    const wrapper = mountComponent(reviews)
    const review1 = wrapper.props('reviews')[0]
    expect(wrapper.props('reviews')).toHaveLength(2)
    expect(review1.author).toBe('Mika')
  })
})

function mountComponent(reviews) {
  const propsData = {
    reviews: reviews ? reviews : [],
  }
  return mountVuetifyComponent(ReviewDetailsCard, propsData)
}
