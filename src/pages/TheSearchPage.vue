<template>
  <div>
    <v-tabs centered>
      
      <v-tab>Hae viinejä</v-tab>
      <v-tab-item>
        <WineSearch/>
      </v-tab-item>
      
      <v-tab>Hae arvosteluja</v-tab>
      <v-tab-item>
        <ReviewSearchForm/>
        <br/>
        <ReviewSearchResults/>
      </v-tab-item>

    </v-tabs>
  </div>
</template>

<script>
  import ReviewSearchForm from "@/components/review/ReviewSearchForm.vue";
  import ReviewSearchResults from "@/components/review/ReviewSearchResults.vue";
  import WineSearch from "@/components/wine/WineSearch.vue";

  export default {
    components: {
      ReviewSearchForm,
      ReviewSearchResults,
      WineSearch,
    },
  };
</script>