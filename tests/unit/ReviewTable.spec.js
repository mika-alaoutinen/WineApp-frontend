import ReviewTable from '@/components/review/ReviewTable.vue'
import { mountVuetifyComponent } from '../index.js'
import { reviews } from '../testdata.js'

const wrapper = mountComponent()

describe('Sanity checks', () => {
  test('reviews prop is received correctly', () => {
    expect(wrapper.props('reviews')).toHaveLength(2)
  })

  test('search prop is received correctly', () => {
    wrapper.setProps({ search: 'haku' })
    expect(wrapper.props('search')).toEqual('haku')
  })
})

describe('Computed properties', () => {
  test('itemsPerPage prop is given default value of 10 when it\'s undefined', () => {
    expect(wrapper.vm.getItemsPerPage).toBe(10)
  })

  test('itemsPerPage prop is received correctly', () => {
    wrapper.setProps({ itemsPerPage: 20 })
    expect(wrapper.props('itemsPerPage')).toBe(20)
    expect(wrapper.vm.getItemsPerPage).toBe(20)
  })
})

describe('Methods', () => {
  test('The first sentence is retrieved from a review text paragraph, ending with \'...\' ', () => {
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
