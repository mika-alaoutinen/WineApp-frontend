import WineSearch from '@/components/wine/WineSearch.vue'
import { mountVuetifyComponent, clickButton } from '@/tests/index.js'

jest.mock('@/services/WineService')

let wrapper
beforeEach(() => wrapper = mountVuetifyComponent(WineSearch, undefined, false))

describe('Computed properties', () => {
  test('allCountries return a list of countries', () => {
    expect(wrapper.vm.allCountries).toStrictEqual(['Italia', 'Espanja'])
  })
})

describe('Search form', () => {
  test('clicking on submit button submits form', async () => {
    await clickButton(wrapper, '#submit-wine-search')
    expect(wrapper.vm.searchDone).toBe(true)
  })

  // TODO: Absolutely no idea why this test doesn't work.
  test('price range parameter is passed on form submit', async () => {
    const range = [9, 12]
    // Vue Test Utils setData function doesn't work, so set data directly:
    wrapper.vm.price.range = range
    await clickButton(wrapper, '#submit-wine-search')
    expect(wrapper.vm.searchParams.priceRange).toBe(range)
  })
})

describe('Search results table', () => {
  test('table is hidden on component mount', () => {
    expect(wrapper.vm.searchDone).toBe(false)
    const style = wrapper.find('.search-results-table').attributes('style')
    expect(style).toBe('display: none;')
  })

  test('table is shown after a search', async () => {
    await clickButton(wrapper, '#submit-wine-search')
    const style = wrapper.find('.search-results-table').attributes('style')
    expect(style).toBe('')
  })
})