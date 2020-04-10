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
})

// describe('Check that wine columns have a header and a value', () => {
//   test('name row', () => {
//     validateColumns('#name', 'Nimi', wine.name)
//   })
// })

// Utility functions:
const validateColumns = (identifier, col1Value, col2Value) => {
  const columns = wrapper.find(identifier).findAll('.col')
  expect(columns.length).toBe(2)
  expect(columns.at(0).text()).toBe(col1Value)
  expect(columns.at(1).text()).toBe(col2Value)
}