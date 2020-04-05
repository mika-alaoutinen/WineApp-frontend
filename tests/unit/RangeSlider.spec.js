import RangeSlider from '@/components/vuetify/RangeSlider.vue'
import { flipSwitch, mountVuetifyComponent } from '../index.js'

describe('Component sanity checks', () => {
  test('component contains range slider and two text-fields', () => {
    const wrapper = mountComponent()
    expect(wrapper.findAll('.v-text-field').length).toBe(2)
    expect(wrapper.findAll('.v-input--switch').length).toBe(1)
  })
})

describe('Component props', () => {
  test('default step value', () => {
    const wrapper = mountComponent()
    expect(wrapper.props('step')).toBe(1)
  })

  test('step value can be given', () => {
    const wrapper = mountComponent(5)
    expect(wrapper.props('step')).toBe(5)
  })

  test('default switch label', () => {
    const wrapper = mountComponent()
    expect(wrapper.props('switchLabel')).toBe('Haku päällä')
  })

  test('switch label value can be given', () => {
    const wrapper = mountComponent(1, 'Hae')
    expect(wrapper.props('switchLabel')).toBe('Hae')
  })
})

describe('Switch functionality', () => {
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
})

describe('Component emits rating range', () => {
  test('emits default range of 0-5 when component is actived the first time', () => {
    const expectedRange = [0, 5]
    const wrapper = mountComponent()
    flipSwitch(wrapper, '#ratingSwitch')
    expect(wrapper.emitted('get:range')[0]).toEqual([expectedRange])
  })

  test('emits empty range when component is set from active to inactive', () => {
    const range = [1, 3]
    const wrapper = mountComponent()
    wrapper.setData({ range: range })

    flipSwitch(wrapper, '#ratingSwitch')
    flipSwitch(wrapper, '#ratingSwitch')

    expect(wrapper.vm.enabled).toEqual(false)
    expect(wrapper.emitted('get:range')[0]).toEqual([range])
    expect(wrapper.emitted('get:range')[1]).toEqual([[]])
  })

  test('emits selected range when component is active', () => {
    const selectedRange = [1, 3]
    const wrapper = mountComponent()

    wrapper.setData({ range: selectedRange })
    flipSwitch(wrapper, '#ratingSwitch')

    expect(wrapper.vm.range).toBe(selectedRange)
    expect(wrapper.emitted('get:range')[0]).toEqual([selectedRange])
  })
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
