<template>
  <v-dialog
    v-model="dialogActive"
    persistent
    width="500"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        id="delete"
        class="primary--text"
        large
        text
        :disabled="isDisabled"
        v-on="on"
      >
        <v-icon>{{ deleteIcon }}</v-icon>
        Poista
      </v-btn>
    </template>

    <ConfirmDeleteDialog
      :item="item"
      @confirm:delete="confirmDelete"
    />
  </v-dialog>
</template>

<script>
  import ConfirmDeleteDialog from '@/components/vuetify/ConfirmDeleteDialog.vue'
  import { getUsername } from '@/services/UserService.js'
  import { mdiDelete } from '@mdi/js'

  export default {
    components: { ConfirmDeleteDialog },

    props: {
      item: { type: Object, required: true }, // item is either wine or review
    },

    data() {
      return {
        deleteIcon: mdiDelete,
        dialogActive: false,
        isDisabled: true,
      }
    },

    mounted() {
      getUsername()
        .then(username => username ? this.isDisabled = false : this.isDisabled = true)
    },

    methods: {
      confirmDelete(confirm) {
        this.$emit('confirm:delete', confirm)
        this.dialogActive = false
      }
    },
  }
</script>