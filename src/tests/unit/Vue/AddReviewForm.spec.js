import AddReviewForm from '@/components/review/AddReviewForm.vue'
import { reviews, wines } from '@/tests/testdata.js'
import { mountVuetifyComponent } from '@/tests/index.js'

jest.mock('@/services/WineService')
jest.mock('@/services/ReviewService')

const review = reviews[0]
let wrapper
beforeEach(() => wrapper = mountVuetifyComponent(AddReviewForm, undefined, false))

describe('Computed properties', () => {
  test('allWines maps wines into text and value fields', () => {
    const winesObjects = wrapper.vm.allWines
    const wine1 = winesObjects[0]
    expect(wine1.text).toBe('Viini 1')
    expect(wine1.value.id).toBe(1)

    const wine2 = winesObjects[1]
    expect(wine2.text).toBe('Viini 2')
    expect(wine2.value.id).toBe(2)
  })
})

describe('Component\'s methods', () => {
  test('successful submit should return true', async () => {
    expect(wrapper.vm.showSuccessAlert).toBe(false)
    expect(wrapper.vm.showErrorAlert).toBe(false)
    await submit(wines[0])
    expect(wrapper.vm.showSuccessAlert).toBe(true)
    expect(wrapper.vm.showErrorAlert).toBe(false)
  })

  test('failed submit should return false and raise error flag', async () => {
    expect(wrapper.vm.showSuccessAlert).toBe(false)
    expect(wrapper.vm.showErrorAlert).toBe(false)
    await submit(wines[1])
    expect(wrapper.vm.showSuccessAlert).toBe(false)
    expect(wrapper.vm.showErrorAlert).toBe(true)
  })

  test('successfulPost should reset review object and set showSuccessAlert to true', () => {
    const defaultReview = {
      author: '',
      date: '',
      id: '',
      rating: '',
      reviewText: '',
      wine: '',
    }

    expect(wrapper.vm.showSuccessAlert).toBe(false)
    wrapper.vm.review = review
    expect(wrapper.vm.review).toBe(review)

    wrapper.vm.successfulPost()
    expect(wrapper.vm.showSuccessAlert).toBe(true)
    expect(wrapper.vm.review).toStrictEqual(defaultReview)
  })
})

describe('Showing alert dialog after submit', () => {
  test('success or error alerts should be hidden on component load', () => {
    expect(wrapper.vm.showSuccessAlert).toBe(false)
    expect(wrapper.vm.showErrorAlert).toBe(false)

    const alerts = wrapper.findAll('.v-alert')
    const successAlert = alerts.at(0)
    const errorAlert = alerts.at(1)

    expect(successAlert.text()).toBe('Uusi arvostelu lisätty!')
    expect(successAlert.attributes('style')).toBe('display: none;')

    expect(errorAlert.text()).toBe('Arvostelun lisääminen epäonnistui!')
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

// Utility functions:
const submit = async wine => {
  wrapper.vm.wine = wine
  wrapper.vm.review = review
  wrapper.vm.submitForm()
  await wrapper.vm.$nextTick()
}