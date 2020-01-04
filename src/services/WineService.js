import Service from "./Service.js";
import WineStore from "@/stores/WineStore.js";

class WineService extends Service {
    constructor() {
        super(WineStore);
    }

    /**
     * Gets all unique wine descriptions as Array.
     * @returns {Array} of unique descriptions.
     */
    getWineDescriptions() {
        const descriptions = Array
            .from(super.getStore().data.wines)
            .map(wine => wine.description);
        
        return flattenAndGetUnique(descriptions);
    }

    /**
     * Gets all unique food pairings as Array.
     * @returns {Array} of unique food pairings.
     */
    getFoodPairings() {
        const foodPairings = Array
            .from(super.getStore().data.wines)
            .map(wine => wine.foodPairings);
        
        return flattenAndGetUnique(foodPairings);
    }
}

/**
 * Filters original nested array for unique values.
 * Returns the unique values in a flattened array.
 * @param {Array} nestedArray.
 * @returns {Array} uniqueItems.
 */
function flattenAndGetUnique(nestedArray) {
    const merged = [].concat.apply([], nestedArray);
    const unique = [...new Set(merged)];
    return unique;
}

export default WineService;