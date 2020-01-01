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
      <v-text-field v-if="editing"
        @keyup.enter="saveEditedWine(wine)"
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
        wineService: new WineService(),
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
      this.wineService
        .get(this.$props.wineId)
        .then(wine => this.wine = wine);
    },

    props: {
      wineId: { type: String, required: true }
    }
  };

</script>

<style scoped>
  .card-title { padding-left: 0 }
  .text-field { padding-top: 0 }
</style>