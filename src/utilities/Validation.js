import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '{_field_} on pakollinen!',
})

extend('password', {
  ...required,
  validate: password => password.length >= 6,
  message: 'Salasanan tulee olla vähintään 6 merkkiä pitkä!',
})

extend('price', {
  validate: number => ({
    required: true,
    valid: number >= 0,
  }),
  message: 'Hinta ei voi olla negatiivinen!',
  computesRequired: true,
})

extend('volume', {
  validate: number => ({
    required: true,
    valid: number > 0,
  }),
  message: 'Määrän tulee olla positiivinen luku!',
  computesRequired: true,
})
