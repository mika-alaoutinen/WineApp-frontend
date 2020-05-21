import { mountVuetifyComponent } from '../../index.js'
import TheNavigation from '@/components/page_elements/TheNavigation.vue'

const wrapper = mountVuetifyComponent(TheNavigation)

describe('Navigation menu buttons', () => {
  test('navigation menu has five buttons', () => {
    const foundButtons = wrapper.findAll('.v-btn')
    const expectedNavButtons = ['Aloitus', 'Arvostelut', 'Viinit', 'Lisää uusi', 'Haku']
    expectedNavButtons.forEach(button =>
      expect(foundButtons.contains(button))
    )
  })
})