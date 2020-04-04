import WineTable from '@/components/wine/WineTable.vue'
import { mountVuetifyComponent } from '../index.js'
import { wines } from '../testdata.js'

const wrapper = mountComponent()

// Sanity check props:
test('wines prop is received correctly', () => {
  expect(wrapper.props('wines')).toHaveLength(2)
})

test('search prop is received correctly', () => {
  wrapper.setProps({ search: 'haku' })
  expect(wrapper.props('search')).toEqual('haku')
})

// Computed properties:
test('itemsPerPage prop is given default value of 10 when it\'s undefined', () => {
  expect(wrapper.vm.getItemsPerPage).toBe(10)
})

test('itemsPerPage prop is received correctly', () => {
  wrapper.setProps({ itemsPerPage: 20 })
  expect(wrapper.props('itemsPerPage')).toBe(20)
  expect(wrapper.vm.getItemsPerPage).toBe(20)
})

// Utility functions:
function mountComponent(itemsPerPage) {
  const propsData = {
    itemsPerPage,
    search: '',
    wines,
  }

  return mountVuetifyComponent(WineTable, propsData)
}
