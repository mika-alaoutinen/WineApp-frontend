<template>
  <div>
    <v-tabs centered>
      
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