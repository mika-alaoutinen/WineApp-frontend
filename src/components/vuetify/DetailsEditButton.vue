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
  import { canUserEdit } from '@/services/UserService.js'
  import { mdiPencil } from '@mdi/js'

  export default {
    props: {
      item: { type: Object, required: true }, // item is either wine or review
    },

    data() {
      return {
        editIcon: mdiPencil,
        isDisabled: true,
      }
    },

    mounted() {
      canUserEdit(this.$props.item)
        .then(canEdit => this.isDisabled = !canEdit)
    }
  }
</script>