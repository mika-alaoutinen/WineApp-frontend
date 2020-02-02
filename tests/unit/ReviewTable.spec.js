import ReviewTable from "@/components/review/ReviewTable.vue";
import { mountVuetifyComponent } from "../index.js";
import { reviews } from "../testdata.js";

const wrapper = mountComponent();

test("reviews prop is received correctly", () => {
    expect(wrapper.props("reviews")).toHaveLength(2);
});

// Computed properties:
test("itemsPerPage prop is given default value when it's undefined", () => {
    expect(wrapper.vm.getItemsPerPage).toBe(10);
});

test("itemsPerPage prop is received correctly", () => {
    wrapper.setProps({ itemsPerPage: 20 });
    expect(wrapper.props("itemsPerPage")).toBe(20);
    expect(wrapper.vm.getItemsPerPage).toBe(20);
});

// Utility functions:
function mountComponent(itemsPerPage) {
    const propsData = {
        reviews: reviews,
        itemsPerPage: itemsPerPage,
        search: "",
    }

    return mountVuetifyComponent(ReviewTable, propsData);
}