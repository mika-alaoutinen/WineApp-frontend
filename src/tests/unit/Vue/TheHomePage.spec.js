import TheHomePage from '@/pages/TheHomePage'
import { mountVuetifyComponent } from '@/tests/index.js'
import { reviews, wines } from '@/tests/testdata'

jest.mock('@/services/ReviewService')
jest.mock('@/services/WineService')

const wrapper = mountVuetifyComponent(TheHomePage)

describe('Component mount functionality', () => {
  test('review count is retrived', () => {
    expect(wrapper.vm.reviewCount).toBe(2)
  })

  test('wine count is retrived', () => {
    expect(wrapper.vm.wineCount).toBe(2)
  })

  test('newest review and wine are retrieved on page load', () => {
    expect(wrapper.vm.newestReview).toStrictEqual(reviews[0])
    expect(wrapper.vm.wine).toStrictEqual(wines[0])
  })
})