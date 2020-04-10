import WineTable from '@/components/wine/WineTable.vue'
import { mountVuetifyComponent } from '../../index.js'
import { wines } from '../../testdata.js'

const wrapper = mountComponent()

describe('Props values', () => {
  test('itemsPerPage default value is 10', () => {
    expect(wrapper.props('itemsPerPage')).toBe(10)
  })

  test('itemsPerPage is received correctly', () => {
    wrapper.setProps({ itemsPerPage: 20 })
    expect(wrapper.props('itemsPerPage')).toBe(20)
  })

  test('search prop is empty by default', () => {
    expect(wrapper.props('search')).toEqual('')
  })

  test('search prop is received correctly', () => {
    wrapper.setProps({ search: 'haku' })
    expect(wrapper.props('search')).toEqual('haku')
  })

  test('wines prop is received correctly', () => {
    const wine1 = wrapper.props('wines')[0]
    expect(wrapper.props('wines')).toHaveLength(2)
    expect(wine1.name).toBe('Viini 1')
  })
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
