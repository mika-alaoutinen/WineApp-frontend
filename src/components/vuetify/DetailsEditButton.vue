<template>
  <v-btn
    id="edit"
    class="secondary--text"
    large
    text
    :disabled="isDisabled"
    @click="$emit('edit:mode', true)"
  >
    <v-icon>{{ editIcon }}</v-icon>
    Muokkaa
  </v-btn>
</template>

<script>
  import { getUsername } from '@/services/UserService.js'
  import { mdiPencil } from '@mdi/js'

  export default {
    data() {
      return {
        editIcon: mdiPencil,
        isDisabled: true,
      }
    },

    mounted() {
      getUsername()
        .then(username => username ? this.isDisabled = false : this.isDisabled = true)
    }
  }
</script>