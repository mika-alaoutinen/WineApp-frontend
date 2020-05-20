<!-- Buttons for confirming and canceling edits to review and wine details. -->
<template>
  <div class="edit-buttons">
    <v-btn
      id="confirm-edit"
      class="secondary--text"
      large
      text
      :disabled="disabled"
      @click="$emit('edit:confirm', true)"
    >
      <v-icon>{{ confirmIcon }}</v-icon>
      Tallenna
    </v-btn>

    <v-btn
      id="cancel-edit"
      class="primary--text"
      large
      text
      :disabled="disabled"
      @click="$emit('edit:confirm', false)"
    >
      <v-icon>{{ cancelIcon }}</v-icon>
      Peruuta
    </v-btn>
  </div>
</template>

<script>
  import { mdiCancel, mdiCheck } from '@mdi/js'

  export default {
    props: {
      disabled: { required: true, type: Boolean },
    },

    data() {
      return {
        cancelIcon: mdiCancel,
        confirmIcon: mdiCheck,
      }
    },
  }
</script>