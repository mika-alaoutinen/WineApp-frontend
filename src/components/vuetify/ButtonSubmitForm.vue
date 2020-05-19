<template>
  <v-btn
    class="button-save secondary--text"
    :disabled="isDisabled"
    large
    text
    type="submit"
  >
    <v-icon>{{ addIcon }}</v-icon>
    {{ buttonText }}
  </v-btn>
</template>

<script>
  import { getUsername } from '@/services/UserService.js'
  import { mdiPlus } from '@mdi/js'

  export default {
    props: {
      buttonText: { required: false, type: String, default: 'Lisää' }
    },

    data() {
      return {
        addIcon: mdiPlus,
        isDisabled: true
      }
    },

    mounted() {
      getUsername()
        .then(username => username ? this.isDisabled = false : this.isDisabled = true)
    }
  }
</script>