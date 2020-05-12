import UserCredentialsForm from '@/components/authentication/UserCredentialsForm.vue'
import { mountVuetifyComponent, submitForm } from '@/tests/index.js'

describe('Props values', () => {
  test('all props are optional', () => {
    expect(UserCredentialsForm.props.buttonIcon.required).toBe(false)
    expect(UserCredentialsForm.props.buttonText.required).toBe(false)
    expect(UserCredentialsForm.props.passwordValidationRule.required).toBe(false)
  })

  test('Check prop default values', () => {
    const wrapper = mount()
    expect(wrapper.props('buttonIcon')).toBe('mdiPlus')
    expect(wrapper.props('buttonText')).toBe('Lähetä')
    expect(wrapper.props('passwordValidationRule')).toBe('required')
  })

  test('buttonIcon prop is received correctly', () => {
    const wrapper = mount({ buttonIcon: 'icon' })
    expect(wrapper.props('buttonIcon')).toBe('icon')
  })

  test('buttonText prop is received correctly', () => {
    const wrapper = mount({ buttonText: 'Text' })
    expect(wrapper.props('buttonText')).toBe('Text')
  })

  test('passwordValidationRule prop is received correctly', () => {
    const wrapper = mount({ passwordValidationRule: 'rule' })
    expect(wrapper.props('passwordValidationRule')).toBe('rule')
  })
})

describe('SubmitForm() method', () => {
  test('submit emits post:user event', async () => {
    const user = {
      username: 'user',
      password: 'password'
    }
    const wrapper = mount()
    wrapper.setData({ user: user })
    await submitForm(wrapper)
    expect(wrapper.emitted('post:user')[0]).toEqual([user])
  })
})

const mount = props => mountVuetifyComponent(UserCredentialsForm, props)