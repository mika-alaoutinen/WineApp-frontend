import DatePicker from '@/components/vuetify/DatePicker.vue'
import { mountVuetifyComponent } from '../index.js'

const today = new Date().toISOString()
const todayCompare = today.substr(0, 15) // today's date at a reasonable accuracy

describe('Date calendar', () => {
  test('Default calendar format is date', () => {
    const wrapper = defaultMount()
    expect(wrapper.vm.$props.calendarType).toBe('date')
    expect(wrapper.vm.date).toContain(todayCompare)
    expect(wrapper.vm.dateString).toBe(formatDate(today))
  })

  test('date is given as prop', () => {
    const date = new Date(2019, 11, 17).toISOString()
    const wrapper = mountComponent('date', true, 'Päivämäärä', date)
    expect(wrapper.vm.$props.calendarType).toBe('date')
    expect(wrapper.vm.dateString).toBe(formatDate(date))
  })
})

describe('Month calendar', () => {
  test('default date is current month', () => {
    const wrapper = mountComponent('month', true, 'Kuukausi')
    expect(wrapper.vm.$props.calendarType).toBe('month')
    expect(wrapper.vm.dateString).toBe(formatMonth(today))
  })

  test('month is given as prop', () => {
    const wrapper = mountComponent('month', true, 'Kuukausi', today)
    expect(wrapper.vm.$props.calendarType).toBe('month')
    expect(wrapper.vm.dateString).toBe(formatMonth(today))
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