<template>
  <div id="wine">

    <div class="table">
      <div class="tablerow" v-for="(value, attribute, index) in displayWine" :key="index">
        <div class="left-column">{{ attribute }}</div>
        <!-- Editing mode -->
        <div v-if="editing === wine.id" class="right-column">
          <input type="text" @keyup.enter="editWine(wine)" v-model="wine[attribute]">
        </div>
        <!-- View mode -->
        <div v-else class="right-colument"> {{ value }} </div>
      </div>
    </div>
    
    <!-- Edit and delete buttons -->
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

  export default {
    data() {
      return {
        editing: null,
        wine: wineService.getFromWineStore(this.$props.wineId),
      };
    },

    computed: {
      displayWine: function() {
        const wineCopy = Object.assign({}, this.wine);
        delete wineCopy.id;
        return wineCopy;
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
        this.$router.push("/wines/");
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
    return Array.from(Object.values(wine))
                .some(value => value === "" || value === []);
  }
</script>

<style>
  .left-column { font-weight: bold }
  .table {
    display: table;
    background: pink;
    margin: auto;
  }
  .tablerow { display: table-row }
  .tablerow > div { display: table-cell }
</style>