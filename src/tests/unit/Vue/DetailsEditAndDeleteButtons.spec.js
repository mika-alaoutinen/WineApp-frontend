import DetailsEditAndDeleteButtons from '@/components/buttons/DetailsEditAndDeleteButtons.vue'
import { clickButton, mountVuetifyComponent } from '@/tests/index.js'

describe('Props work', () => {
  test('All props are required', () => {
    expect(DetailsEditAndDeleteButtons.props.item.required).toBe(true)
    expect(DetailsEditAndDeleteButtons.props.redirectRoute.required).toBe(true)
  })

  test('Props values are handled correctly', () => {
    const wrapper = mount()
    expect(wrapper.props('item').volume).toBe(1)
    expect(wrapper.props('redirectRoute').name).toBe('edit-wine')
  })
})

describe('Computed properties', () => {
  test('confirmation text for wine is shown correctly', () => {
    const wrapper = mount()
    expect(wrapper.vm.deleteConfirmText).toBe('Haluatko varmasti poistaa viinin wine 1?')
  })

  test('confirmation text for review is shown correctly', () => {
    const wrapper = mount({ author: 'Mika' })
    expect(wrapper.vm.deleteConfirmText).toBe('Haluatko varmasti poistaa käyttäjän Mika arvostelun?')
  })

  test('default confirmation text', () => {
    const wrapper = mount({ foo: 'bar' })
    expect(wrapper.vm.deleteConfirmText).toBe('Haluatko varmasti poistaa tämän?')
  })
})

describe('Component behavior', () => {
  test('buttons are disabled and dialog is inactive on load', () => {
    const wrapper = mount()
    expect(wrapper.vm.disabled).toBe(true)
    expect(wrapper.vm.dialogActive).toBe(false)
  })

  test('clicking on delete buttons opens dialog', () => {
    const wrapper = mount()
    wrapper.setData({ disabled: false })
    clickButton(wrapper, '#delete-button')
    expect(wrapper.vm.dialogActive).toBe(true)
  })
})

describe('Emitting delete confirmation', () => {
  test('confirm delete is caught and emitted to parent', () => {
    testEmits(true)
  })

  test('cancel delete is caught and emitted to parent', () => {
    testEmits(false)
  })
})

const testEmits = confirm => {
  const wrapper = mount()
  wrapper.vm.$emit('confirm:delete', confirm)
  expect(wrapper.emitted('confirm:delete')[0]).toStrictEqual([confirm])
  expect(wrapper.vm.dialogActive).toStrictEqual(false)
}

const mount = item => mountVuetifyComponent(DetailsEditAndDeleteButtons, {
  item: item ? item : { name: 'wine 1', volume: 1 },
  redirectRoute: { name: 'edit-wine' }
})