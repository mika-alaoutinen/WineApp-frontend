<template>
  <v-card class="details-card" max-width="60em">

    <v-img height="25em" :src="getImage" />
    <v-card-title class="card-title">Viinin tiedot</v-card-title>

    <v-row v-for="(value, attribute) in wineWithoutId" :key="attribute">

      <!-- Left column for attribute names. -->
      <v-col class="attribute-text" sm="3">
        {{ util.translate("wine", attribute) }}
      </v-col>

      <!-- Right column for values. -->
      <!-- Editing mode: -->
      <v-text-field v-if="editing"
        @keyup.enter="saveEditedWine(wine)"
        class="ma-0 pa-0"
        v-model="wine[attribute]">
      </v-text-field>

      <!-- View mode: -->
      <v-col v-else>
        <div v-if="attribute === 'type'">
          {{ util.translate("wine", value) }}
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
  import ReviewDetailsCard from "@/components/review/ReviewDetailsCard.vue";
  import ReviewService from "@/services/ReviewService.js";
  import Utilities from "@/utilities/Utilities.js";
  import WineService from "@/services/WineService.js";

  const reviewService = new ReviewService();
  const wineService = new WineService();

  export default {
    components: { DetailsButtons, ReviewDetailsCard },

    computed: {
      getImage() {
        const invalid = ["", undefined, null];

        return invalid.includes(this.wine.type)
          ? require("@/assets/wine-images/wines.jpg")
          : require("@/assets/wine-images/" + this.wine.type.toLowerCase() + ".jpg");
      },
    },

    data() {
      return {
        editing: false,
        reviews: [],
        util: Utilities,
        
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
                 .then(() => this.setWineWithoutId());
      
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
    text-align: start;
  }
</style>