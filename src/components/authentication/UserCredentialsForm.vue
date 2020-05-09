<template>
  <ValidationObserver
    ref="form"
    v-slot="{ handleSubmit }"
  >
    <v-form @submit.prevent="handleSubmit(submitForm)">
      <!-- Username, required -->
      <validation-provider
        v-slot="{ errors }"
        name="Username"
        rules="required"
      >
        <v-text-field
          v-model="user.username"
          :label="util.translate('user', 'username')"
        />
        <span class="validationErrorMessage">{{ errors[0] }}</span>
      </validation-provider>

      <!-- Password, required, min 6 characters -->
      <validation-provider
        v-slot="{ errors }"
        name="Password"
        :rules="passwordValidationRule"
      >
        <v-text-field
          v-model="user.password"
          :label="util.translate('user', 'password')"
        />
        <span class="validationErrorMessage">{{ errors[0] }}</span>
      </validation-provider>

      <!-- Form submit button to save the new review: -->
      <v-btn
        class="button-save secondary--text"
        large
        text
        type="submit"
      >
        {{ buttonText }}
      </v-btn>
    </v-form>
  </ValidationObserver>
</template>

<script>
  import Utilities from '@/utilities/Utilities.js'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import '@/utilities/Validation.js'

  export default {
    components: { ValidationObserver, ValidationProvider },

    props: {
      buttonText: { required: false, type: String, default: 'Lähetä' },
      passwordValidationRule: { required: false, type: String, default: 'required' },
    },

    data() {
      return {
        user: {
          username: '',
          password: '',
        },

        util: Utilities,
      }
    },

    methods: {
      submitForm() {
        this.$emit('get:credentials', this.user)
      },
    },

  }
</script>