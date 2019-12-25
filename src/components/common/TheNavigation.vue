<template>
  <div>
    <h1>Wine App</h1>
    <p>Viinin maistelu sovellus.</p>

    <div class="navigation">
      <router-link to="/home">Aloitus</router-link>
      <router-link to="/new-reviews">Uudet arvostelut</router-link>
      <router-link to="/wines">Viinit</router-link>
      <router-link to="/search-wines">Hae viinejä</router-link>
      <router-link to="/add-wine">Lisää viini</router-link>
    </div>
    
  </div>
</template>

<style scoped>
  .navigation a {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
</style>