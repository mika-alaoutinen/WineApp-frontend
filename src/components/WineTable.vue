<template>
  <div id="wine-table">
    <p v-if="WineStore.wines.length < 1" class="empty-table">Ei viinejä</p>
    <table v-else>
      <thead>
        <tr>
          <th>Nimi</th>
          <th>Tyyppi</th>
          <th>Maa</th>
          <th>Hinta (€)</th>
          <th>Määrä (l)</th>
          <th>Kuvaus</th>
          <th>Ruokasuositukset</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        <!-- TODO: figure out a smarter way to edit wines. -->
        <tr v-for="wine in WineStore.wines" :key="wine.id">
          <td v-if="editing === wine.id">
            <input type="text" v-model="wine.name">
          </td>
          <td v-else>{{ wine.name }}</td>
          <td>{{ wine.type }}</td>
          <td>{{ wine.country }}</td>
          <td>{{ wine.price }}</td>
          <td>{{ wine.quantity }}</td>
          <td>{{ wine.description }}</td>
          <td>{{ wine.foodPairings }}</td>
          <td>{{ wine.url }}</td>
          <td v-if="editing === wine.id">
            <button @click="editWine(wine)">Tallenna</button>
            <button class="muted-button" @click="cancelEdit(wine)">Peruuta</button>
          </td>
          <td v-else>
            <button @click="editMode(wine)">Muokkaa</button>
            <button @click="$emit('delete:wine', wine.id)">Poista</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import WineService from "@/services/WineService.js";
  import WineStore from "@/stores/WineStore.js";

  const wineService = new WineService();

  export default {
    data() {
      return {
        editing: null,
        WineStore: WineStore.data
      }
    },
    methods: {
      editMode(wine) {
        this.cachedWine = Object.assign({}, wine);
        this.editing = wine.id;
      },
      editWine(wine) {
        const wineHasEmptyValue = Array
          .from(Object.values(wine))
          .some(value => value === "" || value === []);
        
        if (wineHasEmptyValue) {
          return;
        }

        wineService.editWine(wine.id, wine);
        this.editing = null;
      },
      cancelEdit(wine) {
        Object.assign(wine, this.cachedWine);
        this.editing = null;
      }
    },
  };
</script>

<style scoped>
  button { margin: 0 0.5rem 0 0 }
</style>