import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'

Vue.config.productionTip = false
Vue.use(Vuetify)

/**
 * A helper function used to mount components that use Vuetify elements.
 * Vuetify components must be mounted like this in order to prevent Vue warnings
 * from flooding the terminal.
 * @param {Object} Component to be tested.
 * @param {Object} propsData props that the component has.
 */
export function mountVuetifyComponent(Component, propsData, sync) {
  // Used to get rid of the following warning:
  // "[Vuetify] Missing v-app or a non-body wrapping element with the [data-app] attribute"
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  // Use localVue and Vuetify to get rid of vuetify error messages:
  const localVue = createLocalVue()
  const vuetify = new Vuetify()

  return mount(Component, {
    sync: sync,
    localVue,
    vuetify,
    propsData,
    stubs: { RouterLink: RouterLinkStub },
  })
}

/**
 * A helper function that clicks a button.
 * @param {Object} wrapper
 * @param {string} buttonId
 */
export async function clickButton(wrapper, buttonId) {
  wrapper.find(buttonId).trigger('click')
  await wrapper.vm.$nextTick()
}

/**
 * A helper function for clicking all buttons with a given class name.
 * @param {Object} wrapper
 * @param {string} class name of buttons to be clicked
 */
export async function clickAllButtons(wrapper, className) {
  wrapper.findAll(className).trigger('click')
  await wrapper.vm.$nextTick()
}

/**
 * A helper function that clicks a switch.
 * @param {Object} wrapper
 * @param {string} switchId
 */
export async function flipSwitch(wrapper, switchId) {
  wrapper.find(switchId).trigger('click')
  await wrapper.vm.$nextTick()
}

/**
 * Test that input field is valid text input and that it has a suitable label.
 * @param {Object} wrapper
 * @param {string} identifier CSS id
 * @param {string} expectedLabel
 */
export function testTextInput(wrapper, identifier, expectedLabel) {
  const input = wrapper.find(identifier)
  expect(input.name()).toBe('input')
  expect(input.attributes('type')).toBe('text')

  const label = `label[for=${identifier.substring(1)}]` // Strip # from CSS id
  const labelText = wrapper.find(label).text()
  expect(labelText).toContain(expectedLabel)
}

/**
 * Find label text.
 * @param {Object} wrapper
 * @param {string} labelText to find
 */
export function findByLabel(wrapper, labelText) {
  return wrapper
    .findAll('.v-label')
    .filter(label => label.text().includes(labelText))
    .at(0)
    .text()
}