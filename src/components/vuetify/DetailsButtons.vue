<template>
  <!-- Save and cancel edits: -->
  <div v-if="$props.editing">
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
      @click="saveItem"
    >
      <v-icon>{{ okIcon }}</v-icon>
      Tallenna
    </v-btn>

    <v-btn
      id="cancel-edit"
      class="primary--text"
      large
      text
      @click="cancelEdit"
    >
      <v-icon>{{ cancelIcon }}</v-icon>
      Peruuta
    </v-btn>
  </div>

  <!-- Edit or delete: -->
  <div v-else>
    <v-btn
      id="edit"
      class="secondary--text"
      large
      text
      @click="editMode"
    >
      <v-icon>{{ editIcon }}</v-icon>
      Muokkaa
    </v-btn>

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
  import { mdiCancel, mdiCheck, mdiDelete, mdiPencil } from '@mdi/js'

  export default {
    components: { ConfirmDeleteDialog },

    props: {
      editing: { type: Boolean, required: true },
      item: { type: Object, required: true }, // item is either wine or review
    },

    data() {
      return {
        cancelIcon: mdiCancel,
        deleteIcon: mdiDelete,
        editIcon: mdiPencil,
        okIcon: mdiCheck,

        cachedItem: {},
        dialogActive: false,
        showErrorAlert: false,
      }
    },

    methods: {
      confirmDelete(confirm) {
        confirm ? this.deleteItem() : this.dialogActive = false
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
        // this.$emit('delete:item', this.$props.item)
        console.log('deleted')
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