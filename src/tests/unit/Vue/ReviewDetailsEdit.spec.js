import ReviewDetailsEdit from '@/components/review/ReviewDetailsEdit.vue'
import { mountVuetifyComponent } from '@/tests/index.js'
import { reviews } from '@/tests/testdata.js'

jest.mock('@/services/ReviewService')

const review = reviews[0]
const props = {
  originalReview: review,
  wineName: 'Viini 1',
}

let wrapper
beforeEach(() => wrapper = mountVuetifyComponent(ReviewDetailsEdit, props, false))

describe('Props work correctly', () => {
  test('All props are required', () => {
    expect(ReviewDetailsEdit.props.originalReview.required).toBe(true)
    expect(ReviewDetailsEdit.props.wineName.required).toBe(true)
  })

  test('Props values are passed correctly', () => {
    expect(wrapper.props('originalReview')).toBe(review)
    expect(wrapper.props('wineName')).toBe('Viini 1')
  })
})

describe('Component\'s data', () => {
  test('show error alert is false on component load', () => {
    expect(wrapper.vm.showErrorAlert).toBe(false)
  })
})