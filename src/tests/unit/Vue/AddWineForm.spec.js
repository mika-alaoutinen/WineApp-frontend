import AddWineForm from '@/components/wine/AddWineForm.vue'
import { wines } from '@/tests/testdata.js'
import { mountVuetifyComponent, submitForm } from '@/tests/index.js'

jest.mock('@/services/WineService')

let wrapper
beforeEach(() => wrapper = mountVuetifyComponent(AddWineForm, undefined, false))

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

describe('Component\'s methods', () => {
  test('successful submit should return true', async () => {
    await submitForm(wrapper, wines[0])
    expect(wrapper.vm.showSuccessAlert).toBe(true)
    expect(wrapper.vm.showErrorAlert).toBe(false)
  })

  test('failed submit should return false and raise error flag', async () => {
    await submitForm(wrapper, wines[1])
    expect(wrapper.vm.showSuccessAlert).toBe(false)
    expect(wrapper.vm.showErrorAlert).toBe(true)
  })

  test('successfulPost should reset wine object and set showSuccessAlert to true', () => {
    const defaultWine = {
      name: '',
      type: '',
      country: '',
      id: '',
      price: '',
      volume: '',
      description: [],
      foodPairings: [],
      url: ''
    }

    wrapper.vm.wine = wines[0]
    expect(wrapper.vm.wine).toBe(wines[0])

    wrapper.vm.successfulPost()
    expect(wrapper.vm.showSuccessAlert).toBe(true)
    expect(wrapper.vm.wine).toStrictEqual(defaultWine)
  })
})

describe('Showing alert dialog after submit', () => {
  test('success or error alerts should be hidden on component load', () => {
    expect(wrapper.vm.showSuccessAlert).toBe(false)
    expect(wrapper.vm.showErrorAlert).toBe(false)

    const alerts = wrapper.findAll('.v-alert')
    const successAlert = alerts.at(0)
    const errorAlert = alerts.at(1)

    expect(successAlert.text()).toBe('Uusi viini lisätty!')
    expect(successAlert.attributes('style')).toBe('display: none;')

    expect(errorAlert.text()).toBe('Viinin lisääminen epäonnistui!')
    expect(errorAlert.attributes('style')).toBe('display: none;')
  })

  test('success alert should be shown when showSuccessAlert flag is true', async () => {
    expect(wrapper.vm.showSuccessAlert).toBe(false)
    wrapper.vm.showSuccessAlert = true
    await wrapper.vm.$nextTick()

    const successAlert = wrapper.findAll('.v-alert').at(0)
    expect(successAlert.attributes('style')).toBe('')
  })

  test('error alert should be shown when showErrorAlert flag is true', async () => {
    expect(wrapper.vm.showErrorAlert).toBe(false)
    wrapper.vm.showErrorAlert = true
    await wrapper.vm.$nextTick()

    const errorAlert = wrapper.findAll('.v-alert').at(1)
    expect(errorAlert.attributes('style')).toBe('')
  })
})

describe('Error handling', () => {
  test('Adding a wine with a unique name should not give an error', async () => {
    expect(wrapper.vm.isNameValid).toBe(true)
    wrapper.vm.wine = { name: 'Uusi viini' }
    await wrapper.vm.validateName()
    expect(wrapper.vm.isNameValid).toBe(true)
  })

  test('Adding a wine with an existing name should give an error', async () => {
    expect(wrapper.vm.isNameValid).toBe(true)
    wrapper.vm.wine = wines[0]
    await wrapper.vm.validateName()
    expect(wrapper.vm.isNameValid).toBe(false)
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