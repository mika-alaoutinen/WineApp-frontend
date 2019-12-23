<template>
  <div>
    <WineSearchForm @get:wines="getWines" />
    <br>
    <WineSearchResults :searchResults="wines" :showResults="showResults" />
  </div>
</template>

<script>
  import WineSearchForm from "@/components/wine/WineSearchForm.vue";
  import WineSearchResults from "@/components/wine/WineSearchResults.vue";
  
  export default {
    components: {
      WineSearchForm,
      WineSearchResults
    },

    data() {
      return {
        wines: [],
        showResults: false,
      }
    },

    methods: {
      getWines(wines) {
        this.wines = wines;
        this.showResults = true;
      }
    }
  };
</script>