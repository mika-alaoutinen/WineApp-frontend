<template>
  <div id="wine-table">
    <table>
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
        <tr v-for="wine in wines" :key="wine.id">
          <td>{{ wine.name }}</td>
          <td>{{ wine.type }}</td>
          <td>{{ wine.country }}</td>
          <td>{{ wine.price }}</td>
          <td>{{ wine.quantity }}</td>
          <td>{{ wine.description }}</td>
          <td>{{ wine.foodPairings }}</td>
          <td>{{ wine.url }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "wine-table",
    props: {
      wines: Array,
    }
  };
</script>

<style scoped>

</style>