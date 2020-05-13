jest.mock('@/services/AuthenticationService.js', () => ({
  __esModule: true,
  register: jest.fn()
}))

import RegistrationForm from '@/components/authentication/RegistrationForm.vue'
import { register } from '@/services/AuthenticationService.js'
import { mountVuetifyComponent } from '@/tests/index.js'

const wrapper = mountVuetifyComponent(RegistrationForm)

describe('Alerts work', () => {
  test('Default state of showErrorAlert is false', () => {
    expect(wrapper.vm.showErrorAlert).toBe(false)
  })

  test('Successful login', async () => {
    testAlerts(true)
  })

  test('Unsuccessful login raises an alert', async () => {
    testAlerts(false)
  })
})

const testAlerts = async registerOk => {
  register.mockReturnValue(Promise.resolve(registerOk))
  await wrapper.vm.doRegister()
  expect(register).toBeCalled()
  expect(wrapper.vm.showSuccessAlert).toBe(registerOk)
  expect(wrapper.vm.showErrorAlert).toBe(!registerOk)
}