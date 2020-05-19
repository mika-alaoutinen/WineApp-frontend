import DetailsButtons from '@/components/vuetify/DetailsButtons.vue'
import { clickButton, mountVuetifyComponent } from '../../index.js'
import { wines, invalidWine, wineWithEmptyValues, expectedWine } from '../../testdata.js'

let wine
beforeEach(() => wine = wines[0])

test('component loads correctly', () => {
  const wrapper = mountComponent(false)
  expect(wrapper.props().item.name).toBe('Viini 1')
})

describe('Editing and saving item', () => {
  // test('click on edit button saves copy of item in data and emits editing state as true', async () => {
  //   const wrapper = mountComponent(false)
  //   clickButton(wrapper, '#edit')
  //   expect(wrapper.vm.cachedItem).toEqual(wine)
  //   expect(wrapper.emitted('get:editing')[0]).toEqual([true])
  // })

  test('click on save edit button emits save message and emits editing state as false', async () => {
    const wrapper = mountComponent(true)
    clickButton(wrapper, '#save-edit')
    expect(wrapper.vm.showErrorAlert).toBe(false)
    expect(wrapper.emitted('save:item')[0]).toEqual([wine])
    expect(wrapper.emitted('get:editing')[0]).toEqual([false])
  })

  test('saving edited item removes any empty values from item\'s array attributes', async () => {
    const propsData = {
      editing: true,
      item: wineWithEmptyValues,
    }

    const wrapper = mountVuetifyComponent(DetailsButtons, propsData)
    clickButton(wrapper, '#save-edit')
    expect(wrapper.emitted('save:item')[0]).toEqual([expectedWine])
  })

  test('invalid item is not saved when save edit button is clicked', async () => {
    const propsData = {
      editing: true,
      item: invalidWine,
    }

    const wrapper = mountVuetifyComponent(DetailsButtons, propsData)
    clickButton(wrapper, '#save-edit')
    expect(wrapper.vm.showErrorAlert).toBe(true)
    expect(wrapper.emitted('save:item')).toBeFalsy()
  })

  test('click on cancel editing button sets item prop to its original value and emits editing state as false', async () => {
    const wrapper = mountComponent(true)
    clickButton(wrapper, '#cancel-edit')
    expect(wrapper.props('item')).toEqual(wine)
    expect(wrapper.emitted('get:editing')[0]).toEqual([false])
  })
})

// describe('Deleting item', () => {
//   test('click on delete button opens confirmation dialog', async () => {
//     const wrapper = mountComponent(false)
//     clickButton(wrapper, '#delete')
//     expect(button).toBeCalledTimes(1)
//     expect(wrapper.emitted('delete:item')).toBe(true)
//   })

//   test('click on confirm delete button closes confirm delete dialog and emits delete message', async () => {
//     const wrapper = mountComponent(false)
//     clickButton(wrapper, '#delete')
//     clickButton(wrapper, '#confirm-delete')
//     expect(wrapper.vm.dialogActive).toBe(false)
//     expect(wrapper.emitted('delete:item')[0]).toEqual([wine])
//   })

//   test('click on cancel delete button closes confirm delete dialog', async () => {
//     const wrapper = mountComponent(false)
//     clickButton(wrapper, '#delete')
//     clickButton(wrapper, '#cancel-delete')
//     expect(wrapper.vm.dialogActive).toBe(false)
//   })
// })

// Utility functions:
function mountComponent(isEditing) {
  const propsData = {
    editing: isEditing,
    item: wine,
  }
  return mountVuetifyComponent(DetailsButtons, propsData)
}
