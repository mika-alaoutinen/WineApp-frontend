<template>
  <div>
    <v-tabs centered>
      
      <v-tab>Hae viinejä</v-tab>
      <v-tab-item>
        <WineSearchForm/>
      </v-tab-item>
      
      <v-tab>Hae arvosteluja</v-tab>
      <v-tab-item>
        <ReviewSearchForm/>
      </v-tab-item>

    </v-tabs>

    <br/>
    <WineSearchResults/>
    <br/>
    <ReviewSearchResults/>
  </div>
</template>

<script>
  import ReviewSearchForm from "@/components/review/ReviewSearchForm.vue";
  import ReviewSearchResults from "@/components/review/ReviewSearchResults.vue";
  import WineSearchForm from "@/components/wine/WineSearchForm.vue";
  import WineSearchResults from "@/components/wine/WineSearchResults.vue";

  export default {
    components: {
      ReviewSearchForm,
      ReviewSearchResults,
      WineSearchForm,
      WineSearchResults,
    },
  };
</script>