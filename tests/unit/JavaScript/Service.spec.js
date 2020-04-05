import Service from '@/services/Service.js'
import WineStore from '@/stores/WineStore.js'
import { wines } from '../../testdata.js'

const service = new Service(WineStore)

describe('Service utility functions', () => {
  test('ID property of object is removed', () => {
    const wine = service.removeObjectId(wines[0])
    expect(wine.id).toBeUndefined()
  })

  test('objects properties are reset', () => {
    const wine = wines[0]
    service.resetObject(wine)
    const allPropertiesEmpty = Object
      .values(wine)
      .some(value => value.length > 0)

    expect(allPropertiesEmpty).toBeFalsy()
  })
})