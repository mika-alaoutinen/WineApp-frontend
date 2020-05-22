import WineDetails from '@/components/wine/WineDetails.vue'
import { mountVuetifyComponent } from '@/tests/index.js'
import { wines } from '@/tests/testdata.js'

jest.mock('@/services/ReviewService')
jest.mock('@/services/WineService')

const wine = wines[0]
const wrapper = mountVuetifyComponent(WineDetails, { wineId: wine.id })

// Wait until async component mount operation is done:
beforeAll(async () => await wrapper.vm.$nextTick())

describe('Component mount', () => {
  test('wineId is given', () => {
    expect(wrapper.props('wineId')).toBe(wine.id)
  })

  test('wine is set to data on component mount', () => {
    expect(wrapper.vm.wine).toBe(wine)
  })
})

describe('Computed properties', () => {
  test('removing ID from wine', () => {
    expect(wrapper.vm.wineWithoutId).not.toContain({ id: 1 })
  })

  test('route is given', () => {
    const route = wrapper.vm.route
    expect(route.name).toBe('edit-wine')
    expect(route.params.originalWine).toBeTruthy()
  })
})

describe('Check that wine columns have a header and a value', () => {
  test('name row', () => {
    validateColumns('#name', 'Nimi', wine.name)
  })

  test('type row', () => {
    validateColumns('#type', 'Tyyppi', 'Punaviini')
  })

  test('country row', () => {
    validateColumns('#country', 'Maa', wine.country)
  })

  test('price row', () => {
    validateColumns('#price', 'Hinta (€)', wine.price.toString())
  })

  test('volume row', () => {
    validateColumns('#volume', 'Määrä (l)', wine.volume.toString())
  })

  test('description row', () => {
    const descriptionDiv = wrapper.find('#description')
    const columns = descriptionDiv.findAll('.col')
    const chips = descriptionDiv.findAll('.v-chip')

    expect(columns.length).toBe(2)
    expect(columns.at(0).text()).toBe('Kuvaus')
    validateChips(chips, wine.description)
  })

  test('food pairings row', () => {
    const foodPairingsDiv = wrapper.find('#foodPairings')
    const columns = foodPairingsDiv.findAll('.col')
    const chips = foodPairingsDiv.findAll('.v-chip')

    expect(columns.length).toBe(2)
    expect(columns.at(0).text()).toBe('Sopii nautittavaksi')
    validateChips(chips, wine.foodPairings)
  })

  test('URL row', () => {
    validateColumns('#url', 'URL', wine.url)
    expect(wrapper.find('#url').find('a')).toBeDefined()
  })
})

// Utility functions:
const validateColumns = (identifier, col1Value, col2Value) => {
  const columns = wrapper.find(identifier).findAll('.col')
  expect(columns.length).toBe(2)
  expect(columns.at(0).text()).toBe(col1Value)
  expect(columns.at(1).text()).toBe(col2Value)
}

const validateChips = (chips, keywords) => {
  for (let i = 0; i < keywords.length; i++) {
    expect(chips.at(i).text()).toBe(keywords[i])
  }
}