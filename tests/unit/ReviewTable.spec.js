import ReviewTable from '@/components/review/ReviewTable.vue'
import { mountVuetifyComponent } from '../index.js'
import { reviews } from '../testdata.js'

const wrapper = mountComponent()

describe('Props values', () => {
  test('itemsPerPage default value is 10', () => {
    expect(wrapper.props('itemsPerPage')).toBe(10)
  })

  test('itemsPerPage is received correctly', () => {
    wrapper.setProps({ itemsPerPage: 20 })
    expect(wrapper.props('itemsPerPage')).toBe(20)
  })

  test('reviews prop is received correctly', () => {
    const review1 = wrapper.props('reviews')[0]
    expect(wrapper.props('reviews')).toHaveLength(2)
    expect(review1.author).toBe('Mika')
  })

  test('search prop is empty by default', () => {
    expect(wrapper.props('search')).toEqual('')
  })

  test('search prop is received correctly', () => {
    wrapper.setProps({ search: 'haku' })
    expect(wrapper.props('search')).toEqual('haku')
  })
})

describe('Methods', () => {
  test('The first sentence is retrieved from a review text paragraph, ending with "..."', () => {
    const { reviewText } = reviews[0]
    expect(wrapper.vm.getExcerpt(reviewText)).toEqual('Viinin 1 arvostelu...')
  })
})

// Utility functions:
function mountComponent(itemsPerPage) {
  const propsData = {
    reviews,
    itemsPerPage,
    search: '',
  }
  return mountVuetifyComponent(ReviewTable, propsData)
}
