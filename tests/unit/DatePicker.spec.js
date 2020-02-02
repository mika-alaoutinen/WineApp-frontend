import DatePicker from "@/components/vuetify/DatePicker.vue";
import { mountVuetifyComponent } from "../index.js";

// Test that component loads correctly with default values:
test("component loads correctly with default values", () => {
    const wrapper = defaultMount();
    expect(wrapper.vm.type).toBe("date");
    expect(wrapper.vm.date).toBe(formatDate());
});

test("component loads correctly with month calendar", () => {
    const wrapper = mountComponent("month", true, "Kuukausi");
    expect(wrapper.vm.type).toBe("month");
    expect(wrapper.vm.date).toBe(formatMonth());
});

test("component loads correctly if a selected date is given as prop", () => {
    const date = formatDate(new Date(2019, 11, 17));
    const wrapper = mountComponent("date", true, "Päivämäärä", date);
    expect(wrapper.vm.type).toBe("date");
    expect(wrapper.vm.date).toBe(date);
});

// Utility functions:
function defaultMount() {
    const defaultPropsData = {
        enabled: true,
        labelText: "Päivämäärä",
    }
    return mountVuetifyComponent(DatePicker, defaultPropsData);
}

function mountComponent(calendarType, isEnabled, labelText, selectedDate) {
    const propsData = {
        calendarType: calendarType,
        enabled: isEnabled,
        labelText: labelText,
        selectedDate: selectedDate,
    }
    return mountVuetifyComponent(DatePicker, propsData);
}

function formatDate(date) {
    return date === undefined
        ? new Date().toISOString().split('T')[0]
        : date.toISOString().split('T')[0];
}

function formatMonth() {
    return new Date().toISOString().substr(0, 7);
}