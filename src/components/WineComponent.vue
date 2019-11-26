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
  import WineService from "@/services/WineService.js";
  const wineService = new WineService();

  export default {
    data() {
      return {
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

    props: {
      wineId: {
        type: String,
        required: true
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