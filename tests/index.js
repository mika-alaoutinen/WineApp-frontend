import Vue from 'vue';
import Vuetify from 'vuetify';
import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils';

Vue.config.productionTip = false;
Vue.use(Vuetify);

/**
 * A helper function used to mount components that use Vuetify elements.
 * Vuetify components must be mounted like this in order to prevent Vue warnings
 * from flooding the terminal.
 * @param {Object} Component to be tested.
 * @param {Object} propsData props that the component has.
 */
export function mountVuetifyComponent(Component, propsData) {
    // Used to get rid of the following warning:
    // "[Vuetify] Missing v-app or a non-body wrapping element with the [data-app] attribute"
    const app = document.createElement('div');
    app.setAttribute('data-app', true);
    document.body.appendChild(app);
    
    // Use localVue and Vuetify to get rid of vuetify error messages:
    const localVue = createLocalVue();
    const vuetify = new Vuetify();

    return mount(Component, {
        localVue,
        vuetify,
        propsData,
        stubs: { RouterLink: RouterLinkStub },
    });
}

/**
 * A helper function that clicks a button.
 * @param {Object} wrapper 
 * @param {string} buttonId 
 */
export async function clickButton(wrapper, buttonId) {
    wrapper.find(buttonId).trigger("click");
    await wrapper.vm.$nextTick();
}

/**
 * A helper function that clicks a switch.
 * @param {Object} wrapper 
 * @param {string} switchId 
 */
export async function flipSwitch(wrapper, switchId) {
    wrapper.find(switchId).trigger("click");
    await wrapper.vm.$nextTick();
}