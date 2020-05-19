<template>
  <div>
    <v-alert
      dismissible
      type="error"
      :value="showErrorAlert"
    >
      Kenttä ei voi olla tyhjä!
    </v-alert>

    <v-btn
      id="save-edit"
      class="secondary--text"
      large
      text
      @click="confirmEdit(true)"
    >
      <v-icon>{{ okIcon }}</v-icon>
      Tallenna
    </v-btn>

    <v-btn
      id="cancel-edit"
      class="primary--text"
      large
      text
      @click="confirmEdit(false)"
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
      showErrorAlert: { required: true, type: Boolean },
    },

    data() {
      return {
        cancelIcon: mdiCancel,
        okIcon: mdiCheck,
      }
    },

    methods: {
      confirmEdit(confirm) {
        this.$emit('confirm:edit', confirm)
      }
    }

  }
</script>