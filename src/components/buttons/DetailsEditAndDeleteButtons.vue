<template>
  <v-dialog
    v-model="dialogActive"
    persistent
    width="500"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        id="delete-button"
        class="primary--text"
        large
        text
        :disabled="disabled"
        v-on="on"
      >
        <v-icon>{{ deleteIcon }}</v-icon>
        Poista
      </v-btn>

      <v-btn
        id="edit-button"
        class="secondary--text"
        large
        text
        :disabled="disabled"
        :to="redirectRoute"
      >
        <v-icon>{{ editIcon }}</v-icon>
        Muokkaa
      </v-btn>
    </template>

    <ConfirmDeleteDialog
      :confirm-text="deleteConfirmText"
      @confirm:delete="confirmDelete"
    />
  </v-dialog>
</template>

<script>
  import ConfirmDeleteDialog from '@/components/common/ConfirmDeleteDialog.vue'
  import { canUserEdit } from '@/services/UserService.js'
  import { getItemType } from '@/utilities/Utilities.js'
  import { mdiDelete, mdiPencil } from '@mdi/js'

  export default {
    components: { ConfirmDeleteDialog },

    props: {
      item: { type: Object, required: true }, // item is either wine or review
      redirectRoute: { type: Object, required: true },
    },

    data() {
      return {
        deleteIcon: mdiDelete,
        editIcon: mdiPencil,
        dialogActive: false,
        disabled: true,
      }
    },

    computed: {
      deleteConfirmText() {
        const confirmation = 'Haluatko varmasti poistaa'
        const item = this.$props.item
        const type = getItemType(item)

        switch (type) {
          case 'review':
            return `${confirmation} käyttäjän ${item.author} arvostelun?`
          case 'wine':
            return `${confirmation} viinin ${item.name}?`
          default:
            return `${confirmation} tämän?`
        }
      }
    },

    mounted() {
      canUserEdit(this.$props.item)
        .then(canEdit => this.disabled = !canEdit)
    },

    methods: {
      confirmDelete(confirm) {
        this.$emit('confirm:delete', confirm)
        this.dialogActive = false
      }
    },
  }
</script>