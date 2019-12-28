<template>
  <div>
    <h1>Wine App</h1>
    <p>Viinin maistelu sovellus.</p>

    <div class="navigation">
      <router-link :to="{ name: 'Home' }">Aloitus</router-link>
      <router-link :to="{ name: 'Reviews' }">Arvostelut</router-link>
      <router-link :to="{ name: 'Wines' }">Viinit</router-link>
      <router-link :to="{ name: 'Add-wine' }">Lisää viini</router-link>
      <router-link :to="{ name: 'Search' }">Haku</router-link>
    </div>
    
  </div>
</template>

<style scoped>
  .navigation a {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
</style>