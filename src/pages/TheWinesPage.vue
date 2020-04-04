<template>
  <v-card
    class="full-page-card"
    max-width="75%"
  >
    <v-card-title class="card-title secondary--text">
      Viinilistaus<v-spacer />
      <v-text-field
        v-model="search"
        :append-icon="searchIcon"
        class="search-bar"
        hide-details
        label="Hae viinejä"
        single-line
      />
    </v-card-title>

    <WineTable
      :items-per-page="15"
      :search="search"
      :wines="wineStore.wines"
    />
  </v-card>
</template>

<script>
  import WineService from '@/services/WineService.js'
  import WineTable from '@/components/wine/WineTable.vue'
  import { mdiMagnify } from '@mdi/js'

  export default {
    components: { WineTable },

    data() {
      return {
        searchIcon: mdiMagnify,

        search: '',
        wineStore: new WineService().getStore().data,
      }
    },

  }
</script>

<style scoped>
  .full-page-card { margin-bottom: 4em }
</style>