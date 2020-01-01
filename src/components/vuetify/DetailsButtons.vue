<template>
  <!-- Edit and delete buttons -->
  <div v-if="editing === $props.item.id">
    <button @click="saveEdit(item)" class="button-save">Tallenna</button>
    <button @click="cancelEdit(item)" class="button-delete">Peruuta</button>
  </div>
  <div v-else>
    <button @click="editMode(item)" class="button-edit">Muokkaa</button>
    <button @click="deleteItem(item.id)" class="button-delete">Poista</button>
  </div>
</template>

<script>
  export default {
    computed: {
      displayItem() {
        const copy = Object.assign({}, this.$props.item);
        delete copy.id;
        return copy;
      },
    },

    data() {
      return {
        editing: null,
      }
    },

    methods: {
      editMode(item) {
        this.cachedItem = Object.assign({}, item);
        this.editing = item.id;
        this.$emit("get:editing", this.item.id);
      },

      cancelEdit(item) {
        Object.assign(item, this.cachedItem);
        this.editing = null;
        this.$emit("get:editing", this.editing);
      },

      saveEdit(item) {
        if (this.inputIsInvalid(item)) {
          return;
        }

        this.$props.service.put(item.id, item);
        this.editing = null;
        this.$emit("get:editing", this.editing);
        
      },

      deleteItem(id) {
        this.$props.service.delete(id);
        const redirectPage = this.$props.service.getStoreType() + "s";
        this.$router.push({ name: redirectPage });
      },

      inputIsInvalid(item) {
        return Array
          .from(Object.values(item))
          .some(value => value === "" || value === []);
      },
    },

    props: {
      item: { type: Object, required: true }, // item is either wine or review
      service: { type: Object, required: true },
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