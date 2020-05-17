<template>
  <!-- Save and cancel edits when in editing mode: -->
  <div v-if="$props.editing">
    <ConfirmEditButtons
      :show-error-alert="showErrorAlert"
      @confirm:edit="confirmEdit"
    />
  </div>

  <!-- Buttons for entering edit or delete mode: -->
  <div v-else>
    <DetailsEditButton @edit:mode="editMode" />

    <DetailsDeleteButton
      :item="item"
      @confirm:delete="confirmDelete"
    />
  </div>
</template>

<script>
  import ConfirmEditButtons from '@/components/vuetify/ConfirmEditButtons.vue'
  import DetailsDeleteButton from '@/components/vuetify/DetailsDeleteButton.vue'
  import DetailsEditButton from '@/components/vuetify/DetailsEditButton.vue'

  export default {
    components: { ConfirmEditButtons, DetailsDeleteButton, DetailsEditButton },

    props: {
      editing: { type: Boolean, required: true },
      item: { type: Object, required: true }, // item is either wine or review
    },

    data() {
      return {
        cachedItem: {},
        showErrorAlert: false,
      }
    },

    methods: {
      cancelEdit() {
        Object.assign(this.$props.item, this.cachedItem)
        this.showErrorAlert = false
        this.$emit('get:editing', false)
      },

      confirmDelete(confirm) {
        if (confirm) {
          this.$emit('delete:item', this.$props.item)
        }
      },

      confirmEdit(confirm) {
        confirm ? this.saveItem() : this.cancelEdit()
      },

      editMode() {
        // Create a deep copy of the original object:
        this.cachedItem = JSON.parse(JSON.stringify(this.$props.item))
        this.$emit('get:editing', true)
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