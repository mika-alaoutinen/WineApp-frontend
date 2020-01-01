<template>
  <!-- Edit and delete buttons -->
  <div v-if="editing === $props.item.id">
    <button @click="saveItem()" class="button-save">Tallenna</button>
    <button @click="cancelEdit()" class="button-delete">Peruuta</button>
  </div>
  <div v-else>
    <button @click="editMode()" class="button-edit">Muokkaa</button>
    <button @click="deleteItem()" class="button-delete">Poista</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        editing: null,
      }
    },

    methods: {
      editMode() {
        this.cachedItem = Object.assign({}, this.$props.item);
        this.editing = this.$props.item.id;
        this.$emit("get:editing", this.editing);
      },

      cancelEdit() {
        Object.assign(this.$props.item, this.cachedItem);
        this.editing = null;
        this.$emit("get:editing", this.editing);
      },

      saveItem() {
        if (this.invalidInput(this.$props.item)) {
          return;
        }
        this.editing = null;
        this.$emit("save:item", this.$props.item);
      },

      deleteItem() {
        this.$emit("delete:item", this.$props.item);
      },

      invalidInput(item) {
        return Array
          .from(Object.values(item))
          .some(value => value === "" || value === []);
      },
    },

    props: {
      item: { type: Object, required: true }, // item is either wine or review
    },

  };
</script>

<style scoped>
  button {
    font-weight: bold;
    padding: 1em;
  }
  .button-delete { color: red }
  .button-edit { color: mediumblue }
  .button-save { color: green }
</style>