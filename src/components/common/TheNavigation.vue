<template>
  <div id="navigation">
    <h1>Wine App</h1>
    <p>Viinin maistelu sovellus.</p>

    <div id="navigation">
      <router-link to="/home">Home</router-link>
      <router-link to="/wines">Wines</router-link>
      <router-link to="/add-wine">New wine</router-link>
    </div>
    
  </div>
</template>

<style>
  #navigation a {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
</style>