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
      <v-row>

        <!-- Start date -->
        <v-col>
          <v-menu
            :close-on-content-click="false"
            :return-value.sync="selectedDateRange[0]"
            max-width="290px"
            min-width="290px"
            offset-y
            transition="scale-transition"
            v-model="displayStartMenu">

            <template v-slot:activator="{ on }">
              <v-text-field
                label="Aloituspäivämäärä"
                readonly
                v-on="on"
                v-model="selectedDateRange[0]">
              </v-text-field>
            </template>
            
            <v-date-picker
              no-title
              scrollable
              type="month"
              v-model="selectedDateRange[0]">
              <v-spacer/>
              <v-btn @click="displayStartMenu = false">Peruuta</v-btn>
              <v-btn @click="saveDate()">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>

        <!-- End date -->
        <v-col>
          <v-menu
            :close-on-content-click="false"
            :return-value.sync="selectedDateRange[1]"
            max-width="290px"
            min-width="290px"
            offset-y
            transition="scale-transition"
            v-model="displayEndMenu">

            <template v-slot:activator="{ on }">
              <v-text-field
                label="Lopetuspäivämäärä"
                readonly
                v-on="on"
                v-model="selectedDateRange[1]">
              </v-text-field>
            </template>
            
            <v-date-picker
              no-title
              scrollable
              type="month"
              v-model="selectedDateRange[1]">
              <v-spacer/>
              <v-btn @click="displayEndMenu = false">Peruuta</v-btn>
              <v-btn @click="searchParams.dateRange[1] = selectedDateRange[1]">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>

      </v-row>

      <p>Start: {{ selectedDateRange[0] }} </p>
      <p>End: {{ selectedDateRange[1] }} </p>

      <!-- Search by rating: -->
      <v-subheader class="subheader">Hae arvosanan perusteella</v-subheader>
      <v-switch
        @change="resetSlider"
        label="Arvosanahaku päällä"
        v-model=searchEnabled>
      </v-switch>

      <v-range-slider
        :disabled=!searchEnabled
        :min=minRating
        :max=maxRating
        step="0.25"
        ticks
        tick-size="4"
        v-model="selectedRatingRange">

        <template v-slot:prepend>
          <v-text-field
            class="slider-value-field"
            single-line
            type="number"
            v-model="selectedRatingRange[0]">
          </v-text-field>
        </template>

        <template v-slot:append>
          <v-text-field
            class="slider-value-field"
            single-line
            type="number"
            v-model="selectedRatingRange[1]">
          </v-text-field>
        </template>
        
      </v-range-slider>
      
    </v-form>

  </v-card>
</template>

<script>
  import ReviewService from "@/services/ReviewService.js";
  const reviewService = new ReviewService();

  export default {
    data() {
      return {
        // Placeholders for date search:
        displayStartMenu: false,
        displayEndMenu: false,
        selectedDateRange: [],
        startLabel: "Aloituspäivämäärä",
        
        // Placeholders for rating search:
        minRating: 0.0,
        maxRating: 5.0,
        searchEnabled: false,
        selectedRatingRange: [0.0, 5.0],

        // Search parameters that get sent to backend:
        searchParams: {
          author: "",
          dateRange: [],
          ratingRange: [],
          wineId: "",
        }
      }
    },

    methods: {
      saveDate() {
        this.searchParams.dateRange[0] = this.selectedDateRange[0];
        this.displayStartMenu = false;
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