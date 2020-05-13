// Note: this is how you mock a named export:
jest.mock('@/services/AuthenticationService.js', () => ({
  __esModule: true,
  login: jest.fn()
}))

import LoginForm from '@/components/authentication/LoginForm.vue'
import { login } from '@/services/AuthenticationService.js'
import { mountVuetifyComponent } from '@/tests/index.js'

const wrapper = mountVuetifyComponent(LoginForm)

describe('Alerts work', () => {
  test('Default state of showErrorAlert is false', () => {
    expect(wrapper.vm.showErrorAlert).toBe(false)
  })

  test('Successful login raises no alert', async () => {
    login.mockReturnValue(Promise.resolve(false))
    await wrapper.vm.doLogin()
    expect(login).toBeCalled()
    expect(wrapper.vm.showErrorAlert).toBe(true)
  })

  test('Unsuccessful login raises an alert', async () => {
    login.mockReturnValue(Promise.resolve(true))
    await wrapper.vm.doLogin()
    expect(login).toBeCalled()
    expect(wrapper.vm.showErrorAlert).toBe(false)
  })
})

describe('Emitting get:userLoggedIn on login', () => {
  test('value is emitted on successful login', async () => {
    login.mockReturnValue(Promise.resolve(false))
    await wrapper.vm.doLogin()
    expect(login).toBeCalled()
    expect(wrapper.emitted('get:userLoggedIn')[0]).toStrictEqual([true])
  })
})
