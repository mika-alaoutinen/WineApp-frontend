<template>
  <div>
    <WineSearchForm @get:wines="getWines" />
    <br>
    <WineSearchResults :searchResults="foundWines" :showResults="showResults" />
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
        foundWines: [],
        showResults: false,
      }
    },

    methods: {
      getWines(wines) {
        this.foundWines = wines;
        this.showResults = true;
      }
    }
  };
</script>