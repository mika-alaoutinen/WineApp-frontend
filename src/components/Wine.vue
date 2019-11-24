<template>
  <div id="wine">
    <div class="wine-name">{{this.wine.name}}</div>
    <div class="table">
      <div class="tablerow" v-for="(value, attribute, index) in wineWithoutName" :key="index">
        <div class="left-column">{{attribute}}</div>
        <div class="right-column">{{value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // wine: {
        //     name: "",
        //     type: "",
        //     country: "",
        //     price: "",
        //     quantity: "",
        //     description: "",
        //     foodPairings: "",
        //     url: ""
        //   },
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
      };
    },
    computed: {
      // TODO: This is probably a bad solution if I want to add editing functionality
      // to Wine component!
      // Deletes the 'name' property from wine, because the name is shown as heading.
      wineWithoutName: function() {
        const wineWithoutName = Object.assign({}, this.wine);
        delete wineWithoutName.name;
        return wineWithoutName;
      }
    }
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