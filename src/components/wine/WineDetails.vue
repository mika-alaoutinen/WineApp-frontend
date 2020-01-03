<template>
  <div>
    
  <v-card class="details-card" max-width="60em">
    <v-img
      height="25em"
      src="https://cdn.pixabay.com/photo/2016/07/26/16/16/wine-1543170_960_720.jpg">
    </v-img>
    <v-card-title class="card-title">Viinin tiedot</v-card-title>

    <v-row v-for="(value, attribute) in wineWithoutId" :key="attribute">
      
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

  <!-- Show reviews of the wine: -->
  <v-card class="details-card" max-width="60em">
    <v-card-title class="card-title">Arvostelut</v-card-title>

    <div v-for="review in reviewsWithoutId" :key="review.id">
      <v-row v-for="(value, attribute) in review" :key="attribute">

        <v-col v-if="attribute !== 'wine'" align="start" sm="3">
          {{ dictionary.translate("review", attribute) }}
        </v-col>

        <v-col v-if="attribute !== 'wine'" align="start">
          {{ value }}
        </v-col>
      </v-row>

    </div>
  </v-card>

  </div>
</template>

<script>
  import DetailsButtons from "@/components/vuetify/DetailsButtons.vue";
  import Dictionary from "@/utilities/Dictionary.js";
  import ReviewService from "@/services/ReviewService.js";
  import WineService from "@/services/WineService.js";

  const reviewService = new ReviewService();
  const wineService = new WineService()

  export default {
    components: { DetailsButtons },

    computed: {
      reviewsWithoutId() {
        return this.reviews.map(review => reviewService.removeObjectId(review));
      },

      wineWithoutId() {
        return wineService.removeObjectId(this.wine);
      },
    },

    data() {
      return {
        dictionary: Dictionary,
        editing: false,
        reviews: [], // Reviews of the wine
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
      
      reviewService.getByWineId(this.$props.wineId)
                   .then(reviews => this.reviews = reviews);
    },

    props: {
      wineId: { required: true },
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