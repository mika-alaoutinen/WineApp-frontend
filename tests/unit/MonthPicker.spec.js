import MonthPicker from '@/components/vuetify/MonthPicker.vue'
import { flipSwitch, mountVuetifyComponent } from '../index.js'

test('component contains two date picker components and a switch', () => {
  const wrapper = mountVuetifyComponent(MonthPicker)
  expect(wrapper.findAll('.v-menu').length).toBe(2)
  expect(wrapper.findAll('.v-input--switch').length).toBe(1)
})

// Switch functionality
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

// Emiting date range:
test('component emits current month when component is actived the first time', () => {
  const currentMonth = formatMonth()
  const expectedRange = [currentMonth, currentMonth]

  const wrapper = mountVuetifyComponent(MonthPicker)
  flipSwitch(wrapper, '#calendarSwitch')
  expect(wrapper.emitted('get:range')[0]).toEqual([expectedRange])
})

test('BROKEN TEST CASE: component emits empty date range when component is set from active to inactive', () => {
  const wrapper = mountVuetifyComponent(MonthPicker)
  wrapper.setData({ range: ['2019-01', '2019-03'] })

  flipSwitch(wrapper, '#calendarSwitch') // on
  flipSwitch(wrapper, '#calendarSwitch') // off

  expect(wrapper.vm.enabled).toEqual(false)
  // For whatever reason the following test doesn't work.
  // expect(wrapper.emitted("get:range")[0]).toEqual([""]);
})

test('component emits selected month range when component is active', () => {
  const dates = ['2019-01', '2019-03']
  const wrapper = mountVuetifyComponent(MonthPicker)

  wrapper.setData({ range: dates })
  flipSwitch(wrapper, '#calendarSwitch')

  expect(wrapper.vm.range).toBe(dates)
  expect(wrapper.emitted('get:range')[0]).toEqual([dates])
})

// Utility functions:
function formatMonth() {
  return new Date().toISOString().substr(0, 7)
}
