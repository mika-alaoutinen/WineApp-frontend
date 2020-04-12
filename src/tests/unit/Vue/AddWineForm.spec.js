import AddWineForm from '@/components/wine/AddWineForm.vue'
// import { mountVuetifyComponent } from '@/tests/index.js'
import { shallowMount } from '@vue/test-utils'

jest.mock('@/services/WineService')
jest.mock('@/stores/WineStore')

let wrapper
beforeEach(() => wrapper = shallowMount(AddWineForm))
// beforeEach(() => wrapper = mountVuetifyComponent(AddWineForm, undefined, false))

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

// describe('interacting with form elements modifies component data', () => {
//   // TODO: No idea why this doesn't work.
//   test('select red wine as wine type', async () => {
//     wrapper.findAll('.v-radio').at(1).trigger('click')
//     await wrapper.vm.$nextTick()
//     expect(wrapper.vm.wine.type).toBe('RED')
//   })
// })