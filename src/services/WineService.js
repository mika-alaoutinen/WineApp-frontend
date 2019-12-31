import Service from "./Service.js";
import WineStore from "@/stores/WineStore.js";

class WineService extends Service {
    constructor() {
        super(WineStore);
    }
}

export default WineService;