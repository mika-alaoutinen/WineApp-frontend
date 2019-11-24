<template>
  <div class="table">
    <div class="tablerow" v-for="(value, name) in example" :key="name">
      <div class="left-column"><p>{{name}}</p></div>
      <div class="right-column"><p>{{value}}</p></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wine: {
          name: "",
          type: "",
          country: "",
          price: "",
          quantity: "",
          description: "",
          foodPairings: "",
          url: ""
        },
        example: {
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
  }
};
</script>

<style>
  .left-column p { font-weight: bold}
  .table {
    background: pink;
    display: table;
    margin: auto;
    width:75%;
    }
  .tablerow { display: table-row }
  .tablerow > div { display: table-cell }
</style>