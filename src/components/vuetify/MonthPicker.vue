<template>
  <v-menu
    :close-on-content-click="false"
    :return-value.sync="date"
    max-width="290px"
    min-width="290px"
    offset-y
    transition="scale-transition"
    v-model="displayMenu">

    <template v-slot:activator="{ on }">
      <v-text-field
        :label="$props.labelText"
        readonly
        v-on="on"
        v-model="date">
      </v-text-field>
    </template>

    <v-date-picker
      :disabled=!enabled
      no-title
      scrollable
      type="month"
      v-model="date">
      <v-spacer />
      <v-btn @click="displayMenu = false">Peruuta</v-btn>
      <v-btn @click="saveDate()">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 7),
      displayMenu: false,
    }),

    methods: {
      saveDate() {
        this.$emit("get:date", this.date);
      }
    },

    props: {
      labelText: { type: String, required: true },
      enabled: { type: Boolean, required: true },
    }
  };
</script>