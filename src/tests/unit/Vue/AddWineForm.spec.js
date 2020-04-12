import AddWineForm from '@/components/wine/AddWineForm.vue'
import { mountVuetifyComponent } from '@/tests/index.js'
import { shallowMount } from '@vue/test-utils'

jest.mock('@/services/WineService')

let wrapper
// beforeEach(() => wrapper = mountVuetifyComponent(AddWineForm))
beforeEach(() => wrapper = shallowMount(AddWineForm))

describe('Data is loaded on component mount', () => {
  test('countries are mounted', () => {
    expect(wrapper.vm.allValues.country).toStrictEqual(['Italia', 'Espanja'])
  })

  test('descriptions are mounted', () => {
    const descriptions = ['keskitanniininen', 'luumuinen','tanniininen', 'tamminen']
    expect(wrapper.vm.allValues.description).toStrictEqual(descriptions)
  })

  test('food pairings are mounted', () => {
    const foodPairings = ['seurustelujuoma', 'liharuuat', 'kana']
    expect(wrapper.vm.allValues.foodPairings).toStrictEqual(foodPairings)
  })
})