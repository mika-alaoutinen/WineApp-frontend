<template>
  <!-- Confirm delete dialog -->
  <v-card>
    <v-card-title>Vahvista poisto</v-card-title>
    <v-card-text>Haluatko varmasti poistaa {{ getItem }}?</v-card-text>
    <v-divider />

    <v-card-actions>
      <v-spacer>
        <v-btn
          id="confirm-delete"
          class="secondary--text"
          large
          text
          @click="confirmDelete(true)"
        >
          <v-icon>{{ deleteIcon }}</v-icon>
          Poista
        </v-btn>

        <v-btn
          id="cancel-delete"
          class="primary--text"
          text
          @click="confirmDelete(false)"
        >
          <v-icon>{{ cancelIcon }}</v-icon>
          Peruuta
        </v-btn>
      </v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mdiCancel, mdiDelete } from '@mdi/js'

  export default {
    props: {
      item: { type: Object, required: true }, // item is either wine or review
    },

    data() {
      return {
        cancelIcon: mdiCancel,
        deleteIcon: mdiDelete,
      }
    },

    computed: {
      getItem() {
        if (this.$props.item.name !== undefined) {
          return 'viinin ' + this.$props.item.name
        } else if (this.$props.item.author !== undefined) {
          return 'käyttäjän ' + this.$props.item.author + ' arvostelun'
        } else {
          return 'tämän'
        }
      }
    },

    methods: {
      confirmDelete(confirm) {
        this.$emit('confirm:delete', confirm)
      },
    },
  }
</script>