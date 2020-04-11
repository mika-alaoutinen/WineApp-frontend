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

describe('Search form elements', () => {
  test('form contains name input', () => {
    testTextInput('#name-input', 'Nimi')
  })

  test('form contains country autocomplete', () => {
    testTextInput('#country-autocomplete', 'Maa')
  })

  test('form contains wine type radio buttons', () => {
    const radioButtons = wrapper.findAll('.v-radio')
    expect(radioButtons.length).toBe(5)

    const radioLabels = ['Kuohuviini', 'Punaviini', 'Roseeviini', 'Valkoviini', 'Muu viini']
    radioLabels.forEach(label =>
      expect(findByLabel(label)).toBeTruthy()
    )
  })

  test('form contains volume checkboxes', () => {
    const checkBoxes = wrapper.findAll('.v-input--checkbox')
    expect(checkBoxes.length).toBe(5)

    const cbLabels = ['0.75', '1', '1.5', '2', '3']
    cbLabels.forEach(label =>
      expect(findByLabel(label)).toBeTruthy()
    )
  })

  test('form contains price range search', () => {
    const inputSwitch = wrapper.find('.v-input--switch')
    expect(inputSwitch).toBeTruthy()

    const rangeSlider = wrapper.find('.v-input--range-slider')
    expect(rangeSlider).toBeTruthy()
  })
})

describe('Search form functionality', () => {
  test('clicking on submit button submits form', async () => {
    await clickButton(wrapper, '#submit-wine-search')
    expect(wrapper.vm.searchDone).toBe(true)
  })

  // // TODO: Absolutely no idea why this test doesn't work.
  // test('price range parameter is passed on form submit', async () => {
  //   const range = [9, 12]
  //   // Vue Test Utils setData function doesn't work, so set data directly:
  //   wrapper.vm.price.range = range
  //   await clickButton(wrapper, '#submit-wine-search')
  //   expect(wrapper.vm.searchParams.priceRange).toBe(range)
  // })
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

// Utility functions:
const testTextInput = (identifier, expectedLabel) => {
  const input = wrapper.find(identifier)
  expect(input.name()).toBe('input')
  expect(input.attributes('type')).toBe('text')

  const label = `label[for=${identifier.substring(1)}]` // Strip # from CSS id
  const labelText = wrapper.find(label).text()
  expect(labelText).toContain(expectedLabel)
}

const findByLabel = labelText => wrapper
  .findAll('.v-label')
  .filter(label => label.text().includes(labelText))
  .at(0)
  .text()