import Vue from 'vue';
import Vuetify from 'vuetify';
import { createLocalVue, mount } from '@vue/test-utils';

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
    const localVue = createLocalVue();
    const vuetify = new Vuetify();

    return mount(Component, {
        localVue,
        vuetify,
        propsData,
    });
}