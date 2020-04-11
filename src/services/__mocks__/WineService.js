import WineStore from '@/stores/WineStore.js'
import Service from '@/services/Service.js'
import { wines } from '@/tests/testdata.js'

class WineService extends Service {
  constructor() {
    super(WineStore)
  }

  getAll() {
    return Promise.resolve(wines)
  }

  get(id) {
    return Promise.resolve(wines.find(wine => wine.id === id))
  }

  search(searchParam) {
    return Promise.resolve(wines)
  }

  getStore() {
    return {
      data: {
        wines,
        storeType: 'wine'
      }
    }
  }
}

export default WineService