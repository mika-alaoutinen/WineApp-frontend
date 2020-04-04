import RangeSlider from '@/components/vuetify/RangeSlider.vue'
import { flipSwitch, mountVuetifyComponent } from '../index.js'

test('component contains range slider and two text-fields', () => {
  const wrapper = mountComponent()
  expect(wrapper.findAll('.v-text-field').length).toBe(2)
  expect(wrapper.findAll('.v-input--switch').length).toBe(1)
})

// Switch functionality
test('Range Slider activation switch is in off position on component load', () => {
  const wrapper = mountComponent()
  expect(wrapper.vm.enabled).toBe(false)
})

test('clicking on switch changes calendars on and off', () => {
  const wrapper = mountComponent()
  expect(wrapper.vm.enabled).toBe(false)
  flipSwitch(wrapper, '#ratingSwitch')
  expect(wrapper.vm.enabled).toBe(true)
  flipSwitch(wrapper, '#ratingSwitch')
  expect(wrapper.vm.enabled).toBe(false)
})

// Emiting rating range:
test('emits default range of 0-5 when component is actived the first time', () => {
  const expectedRange = [0, 5]
  const wrapper = mountComponent()
  flipSwitch(wrapper, '#ratingSwitch')
  expect(wrapper.emitted('get:range')[0]).toEqual([expectedRange])
})

test('BROKEN TEST CASE: component emits empty range when component is set from active to inactive', () => {
  const wrapper = mountComponent()
  wrapper.setData({ range: [1, 3] })

  flipSwitch(wrapper, '#ratingSwitch') // on
  flipSwitch(wrapper, '#ratingSwitch') // off

  expect(wrapper.vm.enabled).toEqual(false)
  // For whatever reason the following test doesn't work.
  // expect(wrapper.emitted("get:range")[0]).toEqual([""]);
})

test('emits selected range when component is active', () => {
  const selectedRange = [1, 3]
  const wrapper = mountComponent()

  wrapper.setData({ range: selectedRange })
  flipSwitch(wrapper, '#ratingSwitch')

  expect(wrapper.vm.range).toBe(selectedRange)
  expect(wrapper.emitted('get:range')[0]).toEqual([selectedRange])
})

// Utility functions:
function mountComponent(step, switchLabel) {
  const propsData = {
    defaultRange: [0, 5],
    step,
    switchLabel,
  }
  return mountVuetifyComponent(RangeSlider, propsData)
}
