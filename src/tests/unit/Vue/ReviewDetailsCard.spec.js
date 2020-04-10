import ReviewDetailsCard from '@/components/review/ReviewDetailsCard.vue'
import { mountVuetifyComponent, clickAllButtons } from '../../index.js'
import { reviews } from '../../testdata.js'

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

  test('expansion panel header contains review author name', () => {
    const wrapper = mountComponent(reviews)
    const headers = wrapper.findAll('.v-expansion-panel-header')
    expect(headers.at(0).text()).toContain('Mika')
    expect(headers.at(1).text()).toContain('Salla')
  })
})

describe('Check that review fields are present', () => {
  test('author fields are rendered and have text', () => {
    const wrapper = mountComponent(reviews)
    clickAllButtons(wrapper, '.v-expansion-panel-header')
    const authors = wrapper.findAll('.author')

    expect(authors.length).toBe(2)
    expect(authors.at(0).text()).toBe('Arvostelija')
  })

  test('date fields are rendered and have text', () => {
    const wrapper = mountComponent(reviews)
    clickAllButtons(wrapper, '.v-expansion-panel-header')
    const dates = wrapper.findAll('.date')

    expect(dates.length).toBe(2)
    expect(dates.at(0).text()).toBe('Päivämäärä')
  })

  test('review text fields are rendered and have text', () => {
    const wrapper = mountComponent(reviews)
    clickAllButtons(wrapper, '.v-expansion-panel-header')
    const reviewTexts = wrapper.findAll('.reviewText')

    expect(reviewTexts.length).toBe(2)
    expect(reviewTexts.at(0).text()).toBe('Arvostelu')
  })

  test('rating fields are rendered and have text', () => {
    const wrapper = mountComponent(reviews)
    clickAllButtons(wrapper, '.v-expansion-panel-header')
    const ratings = wrapper.findAll('.rating')

    expect(ratings.length).toBe(2)
    expect(ratings.at(0).text()).toBe('Arvosana')
  })

  test('review links are rendered and have text', () => {
    const wrapper = mountComponent(reviews)
    clickAllButtons(wrapper, '.v-expansion-panel-header')
    const links = wrapper.findAll('.linkToReview')

    expect(links.length).toBe(2)
    expect(links.at(0).text()).toBe('Linkki')
  })
})

function mountComponent(reviews) {
  const propsData = {
    reviews: reviews ? reviews : [],
  }
  return mountVuetifyComponent(ReviewDetailsCard, propsData)
}
