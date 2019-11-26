<template>
  <div id="wine">

    <div class="wine-name">{{this.wine.name}}</div>
    <div class="table">
      <div class="tablerow" v-for="(value, attribute, index) in wineWithoutName" :key="index">
        <div class="left-column">{{attribute}}</div>
        <div class="right-column">{{value}}</div>
      </div>
    </div>

    <div class="buttons" v-if="editing === this.wine.id">
      <button @click="editWine(wine)">Tallenna</button>
      <button class="muted-button" @click="cancelEdit(wine)">Peruuta</button>
    </div>
    <div class="buttons" v-else>
      <button class="button-edit" @click="editMode(wine)">Muokkaa</button>
      <button class="button-delete" @click="deleteWine(wine.id)">Poista</button>
    </div>

  </div>
</template>

<script>
  import WineService from "@/services/WineService.js";
  const wineService = new WineService();

  // TODO: add edit and delete buttons for a wine.

  export default {
    data() {
      return {
        editing: null,
        wine: wineService.getFromWineStore(this.$props.wineId)
      };
    },

    computed: {
      // Deletes the 'name' property from wine, because the name is shown as heading.
      wineWithoutName: function() {
        const wineWithoutName = Object.assign({}, this.wine);
        delete wineWithoutName.name;
        return wineWithoutName;
      },
    },

    methods: {
      editMode(wine) {
        this.cachedWine = Object.assign({}, wine);
        this.editing = wine.id;
      },

      editWine(wine) {
        if (inputIsInvalid(wine)) {
          return;
        }
        wineService.putWine(wine.id, wine);
        this.editing = null;
      },

      cancelEdit(wine) {
        Object.assign(wine, this.cachedWine);
        this.editing = null;
      },

      deleteWine(id) {
        wineService.deleteWine(id);
      }
    },

    props: {
      wineId: {
        type: String,
        required: true
      }
    }
  };

  // Private functions:
  function inputIsInvalid(wine) {
    return Array
        .from(Object.values(wine))
        .some(value => value === "" || value === []);
  }

</script>

<style>
  .table, .wine-name {
    background: pink;
    margin: auto;
    width:75%;
  }
  .table { display: table }
  .tablerow { display: table-row }
  .tablerow > div { display: table-cell }
  .wine-name { font-weight: bold }
</style>