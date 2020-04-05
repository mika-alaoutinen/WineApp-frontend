import ReviewDetailsCard from '@/components/review/ReviewDetailsCard.vue'
import { mountVuetifyComponent } from '../index.js'
import { reviews } from '../testdata.js'

describe('Check props', () => {
  test('reviews prop is received correctly', () => {
    const wrapper = mountComponent(reviews)
    const review1 = wrapper.props('reviews')[0]
    expect(wrapper.props('reviews')).toHaveLength(2)
    expect(review1.author).toBe('Mika')
  })
})

describe('Check expansion panels', () => {
  test('case no reviews', () => {
    const wrapper = mountComponent()
    expect(wrapper.findAll('.v-expansion-panel').length).toBe(0)
  })

  test('case at least one review', () => {
    const wrapper = mountComponent(reviews)
    expect(wrapper.findAll('.v-expansion-panel').length).toBe(reviews.length)
  })

  // test('expansion panel header contains review author name', () => {
  //   const wrapper = mountComponent(reviews)
  //   const header = wrapper.findAll('.v-expansion-panel-header')
  //   console.log(header)
  //   expect(header).toContain('Mika')
  // })
})

describe('Check that review fields are present', () => {
  test('author fields are rendered and have text', async () => {
    const wrapper = mountComponent(reviews)
    wrapper
      .findAll('.v-expansion-panel-header')
      .trigger('click')

    await wrapper.vm.$nextTick()
    const authors = wrapper.findAll('.author')

    expect(authors.length).toBe(2)
    expect(authors.at(0).text()).toBe('Arvostelija')
  })

  // test('author field', () => {
  //   // date
  // })

  // test('author field', () => {
  //   // reviewText
  // })

  // test('author field', () => {
  //   // rating
  // })

  // test('author field', () => {
  //   // link-to-review
  // })
})

function mountComponent(reviews) {
  const propsData = {
    reviews: reviews ? reviews : [],
  }
  return mountVuetifyComponent(ReviewDetailsCard, propsData)
}
