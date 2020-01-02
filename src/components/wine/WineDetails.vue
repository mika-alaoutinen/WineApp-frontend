<template>
  <v-card class="details-card" max-width="60%">
    <v-img
      height="25em"
      src="https://cdn.pixabay.com/photo/2016/07/26/16/16/wine-1543170_960_720.jpg">
    </v-img>
    <v-card-title class="card-title">Viinin tiedot</v-card-title>

    <v-row v-for="(value, attribute) in displayWine" :key="attribute">
      
      <!-- Left column for attribute names. -->
      <v-col align="start" class="attribute-text" sm="3">
        {{ dictionary.translate("wine", attribute) }}
      </v-col>

      <!-- Right column for values. -->
      <!-- Editing mode: -->
      <v-text-field v-if="editing"
        @keyup.enter="saveEditedWine(wine)"
        class="ma-0 pa-0"
        v-model="wine[attribute]">
      </v-text-field>

      <!-- View mode: -->
      <v-col v-else align="start">

        <div v-if="attribute === 'type'">
          {{ dictionary.translate("wine", value.toLowerCase()) }}
        </div>

        <div v-else-if="attribute === 'description' || attribute === 'foodPairings'">
          <v-chip v-for="keyword in value" :key="keyword">{{ keyword }}</v-chip>
        </div>

        <div v-else-if="attribute === 'url'">
          <a :href="value">{{ validateUrl(value) }}</a>
        </div>

        <div v-else>{{ value }}</div>
      </v-col>
    </v-row>

    <!-- Edit and delete buttons -->
    <DetailsButtons
      @delete:item="deleteWine"
      @get:editing="getEditing"
      @save:item="saveEditedWine"
      :editing="editing"
      :item="wine">
    </DetailsButtons>
    
  </v-card>
</template>

<script>

  /* TODO:
    - Make editing wine description and food pairings better.
  */
 
  import DetailsButtons from "@/components/vuetify/DetailsButtons.vue";
  import Dictionary from "@/utilities/Dictionary.js";
  import WineService from "@/services/WineService.js";
  
  const wineService = new WineService()

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
        editing: false,
        wine: {},
      };
    },

    methods: {
      getEditing(boolean) { this.editing = boolean },

      deleteWine(wine) {
        wineService.delete(wine.id);
        this.$router.push({ name: "wines" });
      },

      saveEditedWine(wine) {
        wineService.put(wine.id, wine);
        this.editing = false;
      },

      validateUrl(url) {
        return url.includes("http") || url.includes("https") ? url : "";
      },
    },

    mounted() {
      wineService.get(this.$props.wineId)
                 .then(wine => this.wine = wine);
    },

    props: {
      wineId: { type: String, required: true }
    }
  };

</script>

<style scoped>
  .card-title { padding-left: 0 }
  .col {
    padding-bottom: 6px;
    padding-top: 6px;
  }
</style>