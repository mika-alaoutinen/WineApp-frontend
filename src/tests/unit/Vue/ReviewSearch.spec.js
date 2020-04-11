import ReviewSearch from '@/components/review/ReviewSearch'
import { mountVuetifyComponent } from '@/tests/index.js'
import { reviews } from '@/tests/testdata.js'

jest.mock('@/services/ReviewService')

let wrapper
beforeEach(() => wrapper = mountVuetifyComponent(ReviewSearch))

describe('Computed properties', () => {
  test('allAuthors return a list of author names', () => {
    expect(wrapper.vm.allAuthors).toStrictEqual(['Mika', 'Salla'])
  })
})

describe('Quick search buttons', () => {
  test('find best reviews', async () => {
    expect(wrapper.vm.foundReviews.length).toBe(0)
    testQuickSearchButtons(0, 'Parhaat')
  })

  test('find worst reviews', async () => {
    expect(wrapper.vm.foundReviews.length).toBe(0)
    testQuickSearchButtons(1, 'Huonoimmat')
  })

  test('find newest reviews', async  () => {
    expect(wrapper.vm.foundReviews.length).toBe(0)
    testQuickSearchButtons(2, 'Uusimmat')
  })
})

const testQuickSearchButtons = async (index, expectedText) => {
  const button = wrapper.find('.quick-search').findAll('.v-btn').at(index)
  expect(button.text()).toBe(expectedText)
  button.trigger('click')

  await wrapper.vm.$nextTick()
  expect(wrapper.vm.foundReviews.length).toBe(2)
  expect(wrapper.vm.searchDone).toBe(true)
}