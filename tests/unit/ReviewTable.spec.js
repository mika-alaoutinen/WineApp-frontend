import ReviewTable from "@/components/review/ReviewTable.vue";
import { mountVuetifyComponent } from "../index.js";
import { reviews } from "../testdata.js";

test("component contains a data table", () => {
    const wrapper = mountComponent(ReviewTable);
    expect(wrapper.props("reviews")).toHaveLength(2);
});

// Utility functions:
function mountComponent() {
    const propsData = {
        reviews: reviews,
        itemsPerPage: 10,
        search: "",
    }

    return mountVuetifyComponent(ReviewTable, propsData);
}