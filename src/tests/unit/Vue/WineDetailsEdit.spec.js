import WineDetailsEdit from '@/components/wine/WineDetailsEdit.vue'
import { mountVuetifyComponent } from '@/tests/index.js'
import { wines } from '@/tests/testdata.js'

jest.mock('@/services/WineService')

const wine = wines[0]
let wrapper
beforeEach(() => wrapper = mountVuetifyComponent(WineDetailsEdit, { originalWine: wine }, false))

describe('Props work correctly', () => {
  test('Original wine is required and gets passed correctly', () => {
    expect(WineDetailsEdit.props.originalWine.required).toBe(true)
    expect(wrapper.props('originalWine')).toBe(wine)
  })
})

describe('Component\'s data', () => {
  test('show error alert is false on component load', () => {
    expect(wrapper.vm.showErrorAlert).toBe(false)
  })
})