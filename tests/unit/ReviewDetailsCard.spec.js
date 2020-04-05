import ReviewTable from '@/components/review/ReviewTable.vue'
import { mountVuetifyComponent } from '../index.js'
import { reviews } from '../testdata.js'

const wrapper = mountComponent()

// Sanity check props:
test('reviews prop is received correctly', () => {
  const review1 = wrapper.props('reviews')[0]
  expect(wrapper.props('reviews')).toHaveLength(2)
  expect(review1.author).toBe('Mika')
})

// Utility functions:
function mountComponent() {
  const propsData = {
    reviews,
  }

  return mountVuetifyComponent(ReviewTable, propsData)
}
