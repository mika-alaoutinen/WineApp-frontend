<template>
  <v-card class="details-card" max-width="60em">

    <v-img height="25em" src="@/assets/red.jpg"></v-img>
    <!-- <v-img height="25em" :src="getImage"></v-img> -->

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
          {{ dictionary.translate("wine", value) }}
          <!-- {{ value.toLowerCase() }} -->
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

  <!-- Show reviews of the wine: -->
  <ReviewDetailsCard :reviews="reviews"/>  

  </v-card>
</template>

<script>
  import DetailsButtons from "@/components/vuetify/DetailsButtons.vue";
  import Dictionary from "@/utilities/Dictionary.js";
  import ReviewDetailsCard from "@/components/review/ReviewDetailsCard.vue";
  import ReviewService from "@/services/ReviewService.js";
  import WineService from "@/services/WineService.js";

  const reviewService = new ReviewService();
  const wineService = new WineService()

  export default {
    components: { DetailsButtons, ReviewDetailsCard },

    computed: {
      getImage() {
        const filePath = "@/assets/" + this.wine.type.toLowerCase() + ".jpg";
        return filePath;
      },

      reviewsWithoutId() {
        return this.reviews.map(review => reviewService.removeObjectId(review));
      },
    },

    data() {
      return {
        dictionary: Dictionary,
        editing: false,
        reviews: [], // Reviews of the wine
        
        wine: {
          name: "",
          type: "",
          country: "",
          price: null,
          volume: null,
          description: [],
          foodPairings: [],
          url: "",
        },
        
        wineWithoutId: {},
      }
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

      setWineWithoutId() {
        this.wineWithoutId = wineService.removeObjectId(this.wine);
      },

      validateUrl(url) {
        return url.includes("http") || url.includes("https") ? url : "";
      },
    },

    mounted() {
      wineService.get(this.$props.wineId)
                 .then(wine => this.wine = wine)
                 .finally(() => this.setWineWithoutId());
      
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