<template>
  <div>
    <h2>Viinin tiedot</h2>

    <!-- <div class="table">
      <div class="tablerow" v-for="(value, attribute, index) in displayWine" :key="index">
        <div class="left-column">{{ dictionary.translate(attribute) }}</div>

        <div v-if="editing === wine.id" class="right-column">
          <input type="text" @keyup.enter="editWine(wine)" v-model="wine[attribute]">
        </div>

        <div v-else class="right-colument"> {{ value }} </div>
      </div>
    </div>
    
    <div class="buttons" v-if="editing === this.wine.id">
      <button @click="editWine(wine)">Tallenna</button>
      <button class="muted-button" @click="cancelEdit(wine)">Peruuta</button>
    </div>
    <div class="buttons" v-else>
      <button class="button-edit" @click="editMode(wine)">Muokkaa</button>
      <button class="button-delete" @click="deleteWine(wine.id)">Poista</button>
    </div> -->

    <v-card class="wine-detail-card" max-width="60em">
      <v-row v-for="(value, attribute) in displayWine" :key="attribute">
        <v-col align="start" sm="3">{{ dictionary.translate(attribute) }}</v-col>
        <v-col align="start">{{ value }}</v-col>
      </v-row>
    </v-card>

  </div>
</template>

<script>
  import WineService from "@/services/WineService.js";
  import Dictionary from "@/utilities/Dictionary.js";
  
  const wineService = new WineService();

  export default {
    data() {
      return {
        dictionary: Dictionary,
        editing: null,
        wine: wineService.getFromWineStore(this.$props.wineId),
      };
    },

    computed: {
      displayWine() {
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
      },
    },

    props: {
      wineId: { type: String, required: true }
    }
  };

  // Private functions:
  function inputIsInvalid(wine) {
    return Array.from(Object.values(wine))
                .some(value => value === "" || value === []);
  }
</script>

<style scoped>
  /* .left-column { font-weight: bold }
  .table {
    display: table;
    background: pink;
    margin: auto;
  }
  .tablerow { display: table-row; }
  .tablerow > div { display: table-cell } */

  .wine-detail-card {
    margin: auto;
    padding-bottom: 1em;
    padding-top: 1em;
    padding-left: 2em;
    padding-right: 2em;
  }
</style>