<template>
  <v-btn
    class="button-save secondary--text"
    :disabled="disabled"
    large
    text
    type="submit"
  >
    <v-icon>{{ addIcon }}</v-icon>
    {{ buttonText }}
  </v-btn>
</template>

<script>
  import { isLoggedIn } from '@/services/UserService.js'
  import { mdiPlus } from '@mdi/js'

  export default {
    props: {
      buttonText: { required: false, type: String, default: 'Lisää' }
    },

    data() {
      return {
        addIcon: mdiPlus,
        disabled: true
      }
    },

    async mounted() {
      const loggedIn = await isLoggedIn()
      this.disabled = !loggedIn
    }
  }
</script>