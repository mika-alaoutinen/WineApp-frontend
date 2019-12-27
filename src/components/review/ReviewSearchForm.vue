<template>
  <v-card class="full-page-card" max-width="60%">
    <v-card-title class="card-title">Hae arvosteluja</v-card-title>

    <v-form @submit.prevent="submitForm">

      <!-- Review quick search: -->  
      <v-subheader class="subheader">Pikahaut</v-subheader>
      <v-btn-toggle class="quick-search" group>
        <v-btn @click="doQuickSearch('best')" small>Parhaat</v-btn>
        <v-btn @click="doQuickSearch('worst')" small>Huonoimmat</v-btn>
        <v-btn @click="doQuickSearch('newest')" small>Uusimmat</v-btn>
        <v-btn @click="doSearch()" small>testi</v-btn>

      </v-btn-toggle>

      <!-- TODO: Maybe change to a select-component..? -->
      <!-- Search by author: -->
      <v-subheader class="subheader">Hae arvostelijan nimen perusteella</v-subheader>
      <v-text-field label="Arvostelijan nimi" v-model="searchParams.author"/>

      <!-- Search by date range: -->
      <v-subheader class="subheader">Hae arvostelun päivämäärän perusteella</v-subheader>

      <!-- Date range -->
      <v-switch
        @change="resetDateRange"
        label="Päivämäärähaku päällä"
        v-model=date.enabled>
      </v-switch>

      <v-row>
        <v-col>
          <MonthPicker
            @get:date="saveStartDate"
            :datePickerEnabled="date.enabled"
            :labelText="'Aloituspäivämäärä'">
          </MonthPicker>
        </v-col>
        
        <v-col>
          <MonthPicker
            @get:date="saveEndDate"
            :datePickerEnabled="date.enabled"
            :labelText="'Lopetuspäivämäärä'">
          </MonthPicker>
        </v-col>
      </v-row>

      <p>Start: {{ date.range[0] }} </p>
      <p>End: {{ date.range[1] }} </p>

      <!-- Search by rating: -->
      <v-subheader class="subheader">Hae arvosanan perusteella</v-subheader>
      <v-switch
        @change="resetSlider"
        label="Arvosanahaku päällä"
        v-model=rating.enabled>
      </v-switch>

      <v-range-slider
        :disabled=!rating.enabled
        :min=rating.min
        :max=rating.max
        step="0.25"
        ticks
        tick-size="4"
        v-model="rating.range">

        <template v-slot:prepend>
          <v-text-field
            class="slider-value-field"
            single-line
            type="number"
            v-model="rating.range[0]">
          </v-text-field>
        </template>

        <template v-slot:append>
          <v-text-field
            class="slider-value-field"
            single-line
            type="number"
            v-model="rating.range[1]">
          </v-text-field>
        </template>
        
      </v-range-slider>
      
    </v-form>

  </v-card>
</template>

<script>
  import MonthPicker from "@/components/vuetify/MonthPicker.vue";
  import ReviewService from "@/services/ReviewService.js";

  const reviewService = new ReviewService();

  export default {
    components: {
      MonthPicker,
    },

    data: () => ({
      // Placeholders for date search:
      date: {
        enabled: false,
        startMenu: false,
        endMenu: false,
        range: [],
      },
      
      // Placeholders for rating search:
      rating: {
        enabled: false,
        min: 0.0,
        max: 5.0,
        range: [0.0, 5.0],
      },

      // Search parameters that get sent to backend:
      searchParams: {
        author: "",
        dateRange: [],
        ratingRange: [],
        wineId: "",
      }
    }),

    methods: {
      resetDateRange() {
        this.searchParams.ratingRange = this.rating.range;
      },

      saveEndDate(date) {
        console.log(date);
        this.date.range[1] = date;
      },

      saveStartDate(date) {
        console.log(date);
        this.date.range[0] = date;
      },

      doQuickSearch(searchType) {
        reviewService.quickSearch(searchType, 10)
                     .then(reviews => this.$emit("get:reviews", reviews));
      },

      // TODO: delete
      doSearch() {
        reviewService.search(this.searchParams).then(response => console.log(response));
      },

      resetSlider() {
        this.searchParams.ratingRange = [ this.minRating, this.maxRating ];
      },

      submitForm() {
        reviewService.search(this.searchParams)
                     .then(reviews => this.$emit("get:reviews", reviews))
      }
    }
  };
</script>

<style scoped>
  .subheader { padding-left: 0 }
  .card-title {
    font-weight: bold;
    padding-left: 0;
  }
  .slider-value-field { width: 60px }
  .slider-value-field >>> input { text-align: center }
</style>