<template>
  <v-btn
    id="edit"
    class="secondary--text"
    large
    text
    @click="$emit('edit:mode', true)"
  >
    <v-icon>{{ editIcon }}</v-icon>
    Muokkaa
  </v-btn>
</template>

<script>
  import { mdiPencil } from '@mdi/js'

  export default {
    data() {
      return {
        editIcon: mdiPencil,
      }
    },
  }
</script>