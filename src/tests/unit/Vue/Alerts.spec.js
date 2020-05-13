import Alerts from '@/components/common/Alerts.vue'
import { mountVuetifyComponent } from '@/tests/index.js'

describe('Props values', () => {
  test('All props are required', () => {
    expect(Alerts.props.showErrorAlert.required).toBe(true)
    expect(Alerts.props.showSuccessAlert.required).toBe(true)
    expect(Alerts.props.errorText.required).toBe(true)
    expect(Alerts.props.successText.required).toBe(true)
  })

  test('Alert props pass values correctly', () => {
    const wrapper = mountVuetifyComponent(Alerts, setupAlertProps(false))
    expect(wrapper.props('showErrorAlert')).toBe(false)
    expect(wrapper.props('showSuccessAlert')).toBe(false)

    wrapper.setProps(setupAlertProps(true))
    expect(wrapper.props('showErrorAlert')).toBe(true)
    expect(wrapper.props('showSuccessAlert')).toBe(true)
  })

  test('Error and success text values pass properly', () => {
    const text1 = 'test text'
    const wrapper = mountVuetifyComponent(Alerts, setupTextProps(text1))
    expect(wrapper.props('errorText')).toBe(text1)
    expect(wrapper.props('successText')).toBe(text1)

    const text2 = 'edited text'
    wrapper.setProps(setupTextProps(text2))
    expect(wrapper.props('errorText')).toBe(text2)
    expect(wrapper.props('successText')).toBe(text2)
  })
})

const setupAlertProps = boolean => ({
  showErrorAlert: boolean,
  showSuccessAlert: boolean,
  errorText: '',
  successText: ''
})

const setupTextProps = text => ({
  showErrorAlert: false,
  showSuccessAlert: false,
  errorText: text,
  successText: text
})