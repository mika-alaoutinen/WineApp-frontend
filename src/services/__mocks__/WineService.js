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

  getCountries() {
    return Promise.resolve(wines.map(wine => wine.country))
  }

  getDescriptions() {
    return Promise.resolve(
      wines.map(wine => wine.description).flat()
    )
  }

  getFoodPairings() {
    const foodPairings = wines.map(wine => wine.foodPairings).flat()
    return Promise.resolve([... new Set(foodPairings)])
  }

  /**
   * Return true if wine id is 1, else return false
   * @param {Object} wine
   */
  post(wine) {
    return Promise.resolve(wine.id === 1)
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