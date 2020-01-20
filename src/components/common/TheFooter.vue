<template>
  <v-footer absolute class="primary" padless>
    <v-spacer class="footer">
      <v-icon large>{{ gitHubIcon }}</v-icon>
      Lähdekoodi:

      <v-icon large>{{ vueIcon }}</v-icon>
      <a href="https://github.com/mika-alaoutinen/WineApp-frontend">frontend</a>

      <v-icon large>{{ javaIcon }}</v-icon>
      <a href="https://github.com/mika-alaoutinen/WineApp">backend</a>
    </v-spacer>
  </v-footer>
</template>

<script>
  import { mdiGithubCircle, mdiLanguageJava, mdiVuejs } from '@mdi/js';

  export default {
    data() {
      return {
        gitHubIcon: mdiGithubCircle,
        javaIcon: mdiLanguageJava,
        vueIcon: mdiVuejs,
      }
    },
  }
</script>

<style scoped>
  a, .footer, .v-icon { color: whitesmoke !important }
  .footer { padding: 0.5em }
  .v-footer { opacity: 0.9 }
  .v-icon { margin-left: 0.5em }
</style>