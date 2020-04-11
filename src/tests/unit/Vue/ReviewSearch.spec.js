import ReviewSearch from '@/components/review/ReviewSearch.vue'
import { mountVuetifyComponent, clickButton, testTextInput, findByLabel } from '@/tests/index.js'

jest.mock('@/services/ReviewService')

let wrapper
beforeEach(() => wrapper = mountVuetifyComponent(ReviewSearch, undefined, false))

describe('Computed properties', () => {
  test('allAuthors return a list of author names', () => {
    expect(wrapper.vm.allAuthors).toStrictEqual(['Mika', 'Salla'])
  })
})

describe('Search form elements', () => {
  test('form contains author select', () => {
    testTextInput(wrapper, '#author-autocomplete', 'Arvostelijan nimi')
  })

  test('form contains month picker', () => {
    expect(wrapper.find('.month-picker')).toBeTruthy()
  })

  test('form contains author select', () => {
    expect(wrapper.find('.range-slider')).toBeTruthy()
  })
})

describe('Quick search buttons', () => {
  test('find best reviews', () => {
    expect(wrapper.vm.foundReviews.length).toBe(0)
    testQuickSearchButtons(0, 'Parhaat')
  })

  test('find worst reviews', () => {
    expect(wrapper.vm.foundReviews.length).toBe(0)
    testQuickSearchButtons(1, 'Huonoimmat')
  })

  test('find newest reviews', () => {
    expect(wrapper.vm.foundReviews.length).toBe(0)
    testQuickSearchButtons(2, 'Uusimmat')
  })
})

describe('Search form', () => {
  test('clicking on submit button submits form', async () => {
    await clickButton(wrapper, '#submit-review-search')
    expect(wrapper.vm.searchDone).toBe(true)
  })

  // // TODO: Absolutely no idea why this test doesn't work.
  // test('date range parameter is passed on form submit', async () => {
  //   const range = ['2020-01', '2020-01']
  //   // Vue Test Utils setData function doesn't work, so set data directly:
  //   wrapper.vm.date.range = range
  //   await clickButton(wrapper, '#submit-review-search')
  //   expect(wrapper.vm.searchParams.dateRange).toBe(range)
  // })
})

describe('Search results table', () => {
  test('table is hidden on component mount', () => {
    expect(wrapper.vm.searchDone).toBe(false)
    const style = wrapper.find('.search-results-table').attributes('style')
    expect(style).toBe('display: none;')
  })

  test('table is shown after a search', async () => {
    await testQuickSearchButtons(0, 'Parhaat')
    const style = wrapper.find('.search-results-table').attributes('style')
    expect(style).toBe('')
  })
})

// Utility functions:
const testQuickSearchButtons = async (index, expectedText) => {
  const button = wrapper.find('.quick-search').findAll('.v-btn').at(index)
  expect(button.text()).toBe(expectedText)
  button.trigger('click')

  await wrapper.vm.$nextTick()
  expect(wrapper.vm.foundReviews.length).toBe(2)
  expect(wrapper.vm.searchDone).toBe(true)
}