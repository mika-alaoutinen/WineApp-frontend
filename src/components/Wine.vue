<template>
  <div id="wine">
    <div class="wine-name">{{this.wine.name}}</div>
    <div class="table">
      <div class="tablerow" v-for="(value, attribute, index) in wineWithoutName" :key="index">
        <div class="left-column">{{attribute}}</div>
        <div class="right-column">{{value}}</div>
      </div>
    </div>

    <!-- delete -->
    <div v-for="(attr, index) in wine1" :key="index">{{attr}}</div>

  </div>
</template>

<script>
  import WineService from "@/services/WineService.js";
  const wineService = new WineService();

  export default {
    data() {
      return {
          wine: {
            name: "Viini",
            type: "red",
            country: "Suomi",
            price: "10",
            quantity: "1",
            description: "makea, marjainen",
            foodPairings: "kaikki käy",
            url: "mika.fi"
          },
          wine1: this.getWine
      };
    },
    computed: {
      // TODO: This is probably a bad solution if I want to add editing functionality
      // to Wine component!
      // Deletes the 'name' property from wine, because the name is shown as heading.
      getWine: function() {
        return wineService.getFromWineStore(this.props.id);
      },
      wineWithoutName: function() {
        const wineWithoutName = Object.assign({}, this.wine);
        delete wineWithoutName.name;
        return wineWithoutName;
      },
    },
    props: ["id"]
  };
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