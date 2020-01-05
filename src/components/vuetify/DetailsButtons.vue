<template>
  <!-- Save and cancel edits: -->
  <div v-if="$props.editing">
    <v-btn @click="saveItem" class="button-save" large text>Tallenna</v-btn>
    <v-btn @click="cancelEdit" class="button-delete" large text>Peruuta</v-btn>
  </div>
  
  <!-- Edit or delete: -->
  <div v-else>
    <v-btn @click="editMode" class="button-edit" large text>Muokkaa</v-btn>

    <v-dialog persistent v-model="dialogActive" width="500">
      <template v-slot:activator="{ on }">
        <v-btn class="button-delete" large text v-on="on">Poista</v-btn>
      </template>

      <v-card>
        <v-card-title>Vahvista poisto</v-card-title>
        <v-card-text>Haluatko varmasti poistaa {{ getItem }}?</v-card-text>
        <v-divider/>
        
        <v-card-actions>
          <v-spacer/>
          <v-btn @click="deleteItem" class="button-save" large text>Vahvista</v-btn>
          <v-btn @click="dialogActive = false" class="button-delete" text>Peruuta</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    computed: {
      getItem() {
        if (this.$props.item.name !== undefined) {
          return "viinin " + this.$props.item.name;
        } else if (this.$props.item.author !== undefined) {
          return "käyttäjän " + this.$props.item.author + " arvostelun";
        } else {
          return "tämän";
        }
      }
    },

    data() {
      return {
        dialogActive: false,
      }
    },

    methods: {
      editMode() {
        this.cachedItem = Object.assign({}, this.$props.item);
        this.$emit("get:editing", true);
      },

      cancelEdit() {
        Object.assign(this.$props.item, this.cachedItem);
        this.$emit("get:editing", false);
      },

      saveItem() {
        if (this.invalidInput(this.$props.item)) {
          return;
        }
        this.$emit("get:editing", false);
        this.$emit("save:item", this.$props.item);
        
      },

      deleteItem() {
        this.$emit("delete:item", this.$props.item);
        this.dialogActive = false;
      },

      invalidInput(item) {
        return Array
          .from(Object.values(item))
          .some(value => value === "" || value === []);
      },
    },

    props: {
      editing: { type: Boolean, required: true },
      item: { type: Object, required: true }, // item is either wine or review
    },

  };
</script>

<style scoped>
  button { font-weight: bold }
  .button-delete { color: red }
  .button-edit { color: mediumblue }
  .button-save { color: green }
</style>