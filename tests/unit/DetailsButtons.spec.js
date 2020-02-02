import DetailsButtons from "@/components/vuetify/DetailsButtons.vue";
import { mountVuetifyComponent } from "../index.js";

test("component loads correctly", () => {
    const wrapper = mountComponent(false);
    expect(wrapper.props().item.name).toBe("Viini");
});

test("click edit button", async () => {
    const wrapper = mountComponent(false);
    wrapper.find("#edit").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("get:editing")[0]).toEqual([true]);
});

test("cancel button sets editing state to false", async () => {
    const wrapper = mountComponent(true);
    wrapper.find("#cancel-edit").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("get:editing")[0]).toEqual([false]);
});

function mountComponent(isEditing) {
    const wine = {
        name: "Viini",
        type: "RED",
        country: "Italia",
        price: 8,
        volume: 0.75,
        description: [ "keskitanniininen", "luumuinen" ],
        foodPairings: [ "seurustelujuoma", "liharuuat" ],
        url: "http://viini.fi",
        reviews: [],
    }

    const propsData = {
        editing: isEditing,
        item: wine,
    }

    return mountVuetifyComponent(DetailsButtons, propsData);
}