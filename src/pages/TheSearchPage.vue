<template>
  <div class="tabs-container">
    <v-tabs centered hide-slider>
      <v-tab>Hae viinejä</v-tab>
      <v-tab-item>
        <WineSearch/>
      </v-tab-item>
      
      <v-tab>Hae arvosteluja</v-tab>
      <v-tab-item>
        <ReviewSearch/>
      </v-tab-item>

    </v-tabs>
  </div>
</template>

<script>
  import ReviewSearch from "@/components/review/ReviewSearch.vue";
  import WineSearch from "@/components/wine/WineSearch.vue";

  export default {
    components: { ReviewSearch, WineSearch },
  };
</script>

<style scoped>
  /* The space between the search card and the results card. */
  .v-window-item--active { background-color: rgba(255, 228, 236, 0.7) } /* pink.lighten5 */
</style>