import MonthPicker from '@/components/vuetify/MonthPicker.vue'
import { flipSwitch, mountVuetifyComponent } from '../index.js'

const currentMonth = new Date().toISOString().substr(0, 7)

describe('component sanity checks', () => {
  test('component contains two date picker components and a switch', () => {
    const wrapper = mountVuetifyComponent(MonthPicker)
    expect(wrapper.findAll('.v-menu').length).toBe(2)
    expect(wrapper.findAll('.v-input--switch').length).toBe(1)
  })
})

describe('Switch functionality', () => {
  test('calendar activation switch is in off position on component load', () => {
    const wrapper = mountVuetifyComponent(MonthPicker)
    expect(wrapper.vm.enabled).toBe(false)
  })

  test('clicking on switch changes calendars on and off', () => {
    const wrapper = mountVuetifyComponent(MonthPicker)
    expect(wrapper.vm.enabled).toBe(false)
    flipSwitch(wrapper, '#calendarSwitch')
    expect(wrapper.vm.enabled).toBe(true)
    flipSwitch(wrapper, '#calendarSwitch')
    expect(wrapper.vm.enabled).toBe(false)
  })
})

describe('Component emits date range', () => {
  test('emits current month when component is actived the first time', () => {
    const expectedRange = [currentMonth, currentMonth]
    const wrapper = mountVuetifyComponent(MonthPicker)

    flipSwitch(wrapper, '#calendarSwitch')
    expect(wrapper.emitted('get:range')[0]).toEqual([expectedRange])
  })

  test('emits selected month range when component is active', () => {
    const range = ['2018-06', '2019-01']
    const wrapper = mountVuetifyComponent(MonthPicker)

    wrapper.setData({ range: range })
    flipSwitch(wrapper, '#calendarSwitch')

    expect(wrapper.vm.enabled).toEqual(true)
    expect(wrapper.vm.range).toBe(range)
    expect(wrapper.emitted('get:range')[0]).toEqual([range])
  })

  test('emits empty date range when component is set from active to inactive', () => {
    const range = ['2019-01', '2019-03']
    const wrapper = mountVuetifyComponent(MonthPicker)
    wrapper.setData({ range: range })

    flipSwitch(wrapper, '#calendarSwitch')
    flipSwitch(wrapper, '#calendarSwitch')

    expect(wrapper.vm.enabled).toEqual(false)
    expect(wrapper.emitted('get:range')[0]).toEqual([range])
    expect(wrapper.emitted('get:range')[1]).toEqual([[]])
  })
})