import FormSubmitButton from '@/components/buttons/FormSubmitButton.vue'
import { mountVuetifyComponent } from '@/tests/index.js'

describe('Check buttonText prop', () => {
  test('buttonText default value is Lisää', () => {
    const wrapper = mount()
    const button = wrapper.find('.button-save')
    expect(wrapper.props('buttonText')).toBe('Lisää')
    expect(button.text()).toBe('Lisää')
  })

  test('buttonText is received correctly', () => {
    const wrapper = mount({ buttonText: 'text' })
    const button = wrapper.find('.button-save')
    expect(wrapper.props('buttonText')).toBe('text')
    expect(button.text()).toBe('text')
  })
})

describe('Button can be disabled', () => {
  test('button is disabled on page load', () => {
    const wrapper = mount()
    const button = wrapper.find('.button-save')
    expect(wrapper.vm.disabled).toBe(true)
    expect(button.element.disabled).toBe(true)
  })

  test('button is enabled if username is received', () => {

  })
})

const mount = props => mountVuetifyComponent(FormSubmitButton, props)