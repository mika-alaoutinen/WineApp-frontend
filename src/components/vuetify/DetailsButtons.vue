<template>
  <!-- Save and cancel edits when in editing mode: -->
  <div v-if="$props.editing">
    <ConfirmEditButtons
      :show-error-alert="showErrorAlert"
      @confirm:edit="confirmEdit"
    />
  </div>

  <!-- Enter edit or delete mode: -->
  <div v-else>
    <DetailsEditButton @edit:mode="editMode" />

    <!-- Clicking delete button opens confirm delete dialog -->
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
          v-on="on"
        >
          <v-icon>{{ deleteIcon }}</v-icon>
          Poista
        </v-btn>
      </template>

      <ConfirmDeleteDialog
        :item="item"
        @confirm:delete="confirmDelete"
        @update:dialogActive="dialogActive=false"
      />
    </v-dialog>
  </div>
</template>

<script>
  import ConfirmDeleteDialog from '@/components/vuetify/ConfirmDeleteDialog.vue'
  import ConfirmEditButtons from '@/components/vuetify/ConfirmEditButtons.vue'
  import DetailsEditButton from '@/components/vuetify/DetailsEditButton.vue'
  import { mdiDelete } from '@mdi/js'

  export default {
    components: { ConfirmDeleteDialog, ConfirmEditButtons, DetailsEditButton },

    props: {
      editing: { type: Boolean, required: true },
      item: { type: Object, required: true }, // item is either wine or review
    },

    data() {
      return {
        deleteIcon: mdiDelete,

        cachedItem: {},
        dialogActive: false,
        showErrorAlert: false,
      }
    },

    methods: {
      confirmDelete(confirm) {
        confirm ? this.deleteItem() : this.dialogActive = false
      },

      confirmEdit(confirm) {
        confirm ? this.saveItem() : this.cancelEdit()
      },

      editMode() {
        // Create a deep copy of the original object:
        this.cachedItem = JSON.parse(JSON.stringify(this.$props.item))
        this.$emit('get:editing', true)
      },

      cancelEdit() {
        Object.assign(this.$props.item, this.cachedItem)
        this.showErrorAlert = false
        this.$emit('get:editing', false)
      },

      saveItem() {
        if (this.invalidInput(this.$props.item)) {
          this.showErrorAlert = true
          return
        }
        this.removeNullsFromArray(this.$props.item)
        this.showErrorAlert = false
        this.$emit('get:editing', false)
        this.$emit('save:item', this.$props.item)
      },

      deleteItem() {
        this.$emit('delete:item', this.$props.item)
        this.dialogActive = false
      },

      invalidInput(item) {
        return Object
          .values(item)
          .some(value => value === '')
      },

      removeNullsFromArray(item) {
        Object
          .keys(item)
          .filter(key => Array.isArray(item[key]))
          .map(key => item[key] = item[key].filter(item => item))
      },
    },

  }
</script>

<style scoped>
  button { font-weight: bold }
</style>