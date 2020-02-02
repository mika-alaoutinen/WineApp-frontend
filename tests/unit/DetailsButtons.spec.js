import DetailsButtons from "@/components/vuetify/DetailsButtons.vue";
import { mountVuetifyComponent } from "../index.js";

let wine;
beforeEach(() => {
    wine = {
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
})

test("component loads correctly", () => {
    const wrapper = mountComponent(false);
    expect(wrapper.props().item.name).toBe("Viini");
});

// Edit item functionality:
test("click on edit button saves copy of item in data and emits editing state as true", async () => {
    const wrapper = mountComponent(false);
    clickButton(wrapper, "#edit");
    expect(wrapper.vm.cachedItem).toEqual(wine);
    expect(wrapper.emitted("get:editing")[0]).toEqual([true]);
});

test("click on cancel editing button sets item prop to its original value and emits editing state as false", async () => {
    const wrapper = mountComponent(true);
    clickButton(wrapper, "#cancel-edit");
    expect(wrapper.props("item")).toEqual(wine);
    expect(wrapper.emitted("get:editing")[0]).toEqual([false]);
});

test("click on save edit button emits save message and emits editing state as false", async () => {
    const wrapper = mountComponent(true);
    clickButton(wrapper, "#save-edit");
    expect(wrapper.emitted("save:item")[0]).toEqual([wine]);
    expect(wrapper.emitted("get:editing")[0]).toEqual([false]);
});

// Lisää kenttä kuvaukseen ja ruokasuosituksiin

// Delete item functionalitY:
test("click on delete button opens confirmation dialog", async () => {
    const wrapper = mountComponent(false);
    clickButton(wrapper, "#delete");
    expect(wrapper.vm.dialogActive).toBe(true);
});

test("click on confirm delete button emits delete message", async () => {
    const wrapper = mountComponent(false);
    clickButton(wrapper, "#delete");
    clickButton(wrapper, "#confirm-delete");
    expect(wrapper.emitted("delete:item")[0]).toEqual([wine]);
});

test("click on cancel delete button closes confirm delete dialog", async () => {
    const wrapper = mountComponent(false);
    clickButton(wrapper, "#delete");
    clickButton(wrapper, "#cancel-delete");
    expect(wrapper.vm.dialogActive).toBe(false);
});

// Utility functions:
function mountComponent(isEditing) {
    const propsData = {
        editing: isEditing,
        item: wine,
    }
    return mountVuetifyComponent(DetailsButtons, propsData);
}

async function clickButton(wrapper, buttonId) {
    wrapper.find(buttonId).trigger("click");
    await wrapper.vm.$nextTick();
}