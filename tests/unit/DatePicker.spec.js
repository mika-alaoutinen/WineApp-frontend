import DatePicker from '@/components/vuetify/DatePicker.vue'
import { mountVuetifyComponent } from '../index.js'

const today = new Date().toISOString()

describe('Date calendar', () => {
  test('default calendar format is date and default date is today', () => {
    const date = formatDate(today)
    const wrapper = defaultMount()
    expect(wrapper.vm.$props.calendarType).toBe('date')
    expect(wrapper.vm.$props.selectedDate).toBe(date)
    expect(wrapper.vm.date).toBe(date)
  })

  test('date is given as prop', () => {
    const wrapper = mountComponent('date', true, 'Päivämäärä', today)
    expect(wrapper.vm.$props.calendarType).toBe('date')
    expect(wrapper.vm.$props.selectedDate).toBe(today)
    expect(wrapper.vm.date).toBe(today)
  })
})

describe('Month calendar', () => {
  test('default month is current month', () => {
    const month = formatMonth(today)
    const wrapper = mountComponent('month', true, 'Kuukausi')
    expect(wrapper.vm.$props.calendarType).toBe('month')
    expect(wrapper.vm.$props.selectedDate).toBe(month)
    expect(wrapper.vm.date).toBe(month)
  })

  test('month is given as prop', () => {
    const wrapper = mountComponent('month', true, 'Kuukausi', today)
    expect(wrapper.vm.$props.calendarType).toBe('month')
    expect(wrapper.vm.$props.selectedDate).toBe(today)
    expect(wrapper.vm.date).toBe(today)
  })
})

// Utility functions:
function defaultMount() {
  const defaultPropsData = {
    enabled: true,
    labelText: 'Päivämäärä',
  }
  return mountVuetifyComponent(DatePicker, defaultPropsData)
}

function mountComponent(calendarType, isEnabled, labelText, selectedDate) {
  const propsData = {
    calendarType,
    enabled: isEnabled,
    labelText,
    selectedDate,
  }
  return mountVuetifyComponent(DatePicker, propsData)
}

const formatDate = date => date.split('T')[0]
const formatMonth = month => month.substr(0, 7)