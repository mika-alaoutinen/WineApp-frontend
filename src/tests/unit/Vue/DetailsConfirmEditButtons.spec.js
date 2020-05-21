import DetailsConfirmEditButtons from '@/components/buttons/DetailsConfirmEditButtons.vue'
import { clickButton, mountVuetifyComponent } from '@/tests/index.js'

describe('edit:confirm is emitted', () => {
  test('confirm button emits true', () => {
    const wrapper = mountVuetifyComponent(DetailsConfirmEditButtons)
    clickButton(wrapper, '#confirm-edit')
    expect(wrapper.emitted('edit:confirm')[0]).toEqual([true])
  })

  test('cancel button emits false', () => {
    const wrapper = mountVuetifyComponent(DetailsConfirmEditButtons)
    clickButton(wrapper, '#cancel-edit')
    expect(wrapper.emitted('edit:confirm')[0]).toEqual([false])
  })
})