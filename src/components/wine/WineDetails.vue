<template>
  <v-card class="details-card" max-width="60%">
    <v-card-title class="card-title">Viinin tiedot</v-card-title>

    <v-row v-for="(value, attribute) in displayWine" :key="attribute">
      
      <!-- Left column for attribute names. -->
      <v-col align="start" class="attribute-text" sm="3">
        {{ dictionary.translate("wine", attribute) }}
      </v-col>

      <!-- Right column for values. -->
      <!-- Editing mode: -->
      <v-text-field v-if="editing === wine.id"
        @keyup.enter="saveEdit(wine)"
        align="start"
        class="text-field"
        v-model="wine[attribute]">
      </v-text-field>

      <!-- View mode: -->
      <v-col v-else align="start">
        <!-- Description and food pairings are shown as chips: -->
        <div v-if="attribute === 'description' || attribute === 'foodPairings'">
          <v-chip v-for="keyword in value" :key="keyword">
            {{ keyword }}
          </v-chip>
        </div>
        <!-- Valid URLs are shown as hyperlinks, invalid URLs are hidden: -->
        <div v-else-if="attribute === 'url'">
          <a :href="value">{{ validateUrl(value) }}</a>
        </div>
        <!-- Regular text: -->
        <div v-else>{{ value }}</div>
      </v-col>
    </v-row>

    <!-- Edit and delete buttons -->
    <DetailsButtons @get:editing="assignEdit" :item="this.wine" :service="this.wineService" />

    <!-- <div v-if="editing === this.wine.id">
      <button @click="saveEdit(wine)" class="button-save">Tallenna</button>
      <button @click="cancelEdit(wine)" class="button-delete">Peruuta</button>
    </div>
    <div v-else>
      <button @click="editMode(wine)" class="button-edit">Muokkaa</button>
      <button @click="deleteWine(wine.id)" class="button-delete">Poista</button>
    </div> -->
    
  </v-card>
</template>

<script>
  import DetailsButtons from "@/components/vuetify/DetailsButtons.vue";
  import Dictionary from "@/utilities/Dictionary.js";
  import WineService from "@/services/WineService.js";
  
  export default {
    components: { DetailsButtons },

    computed: {
      displayWine() {
        const wineCopy = Object.assign({}, this.wine);
        delete wineCopy.id;
        return wineCopy;
      },
    },

    data() {
      return {
        dictionary: Dictionary,
        editing: null,
        wine: {},
        wineService: new WineService(),
      };
    },

    methods: {
      assignEdit(editedWine) {
        console.log("edited: " + editedWine);
        console.log("this.wine.id: " + this.wine.id);
        this.editing = editedWine;
      },

      validateUrl(url) {
        return url.includes("http") || url.includes("https") ? url : "";
      },
    },

      // cancelEdit(wine) {
      //   Object.assign(wine, this.cachedWine);
      //   this.editing = null;
      // },

      // deleteWine(id) {
      //   this.wineService.delete(id);
      //   this.$router.push({ name: "wines" });
      // },

      // editMode(wine) {
      //   this.cachedWine = Object.assign({}, wine);
      //   this.editing = wine.id;
      // },

      // saveEdit(wine) {
      //   if (inputIsInvalid(wine)) {
      //     return;
      //   }
      //   this.wineService.put(wine.id, wine);
      //   this.editing = null;
      // },

    mounted() {
      this.wineService.get(this.$props.wineId)
                 .then(wine => this.wine = wine);
    },

    props: {
      wineId: { type: String, required: true }
    }
  };

  // Utility functions:
  // function inputIsInvalid(wine) {
  //   return Array.from(Object.values(wine))
  //               .some(value => value === "" || value === []);
  // }

</script>

<style scoped>
  button {
    font-weight: bold;
    padding: 1em;
  }
  .attribute-text { font-weight: bold }
  .button-delete { color: red }
  .button-edit { color: mediumblue }
  .button-save { color: green }
  .card-title { padding-left: 0 }
  .text-field { padding-top: 0 }
</style>