import ConfirmDeleteDialog from '@/components/common/ConfirmDeleteDialog.vue'
import { clickButton, mountVuetifyComponent } from '@/tests/index.js'

describe('Props are handled correctly', () => {
  test('default confirm text', () => {
    const wrapper = mount()
    expect(ConfirmDeleteDialog.props.confirmText.required).toBe(false)
    expect(wrapper.props('confirmText')).toBe('Haluatko varmasti poistaa tämän?')
  })

  test('confirm text can be given as prop', () => {
    const text = 'confirm'
    const wrapper = mount({ confirmText: text })
    expect(wrapper.props('confirmText')).toBe(text)
  })
})

describe('Clicking buttons emits delete confirm events', () => {
  test('confirm delete emits true', () => {
    const wrapper = mount()
    clickButton(wrapper, '#confirm-delete')
    expect(wrapper.emitted('confirm:delete')[0]).toStrictEqual([true])
  })

  test('cancel delete emits false', () => {
    const wrapper = mount()
    clickButton(wrapper, '#cancel-delete')
    expect(wrapper.emitted('confirm:delete')[0]).toStrictEqual([false])
  })
})

const mount = props => mountVuetifyComponent(ConfirmDeleteDialog, props)