<template>
  <v-menu
    max-width="290px"
    min-width="290px"
    offset-y
    transition="scale-transition">

    <template v-slot:activator="{ on }">
      <v-text-field
        :label="$props.labelText"
        readonly
        v-on="on"
        v-model="date">
      </v-text-field>
    </template>

    <v-date-picker
      @change="emitDate"
      :disabled=!enabled
      no-title
      scrollable
      type="month"
      v-model="date">
    </v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    data() {
      return {
        date: new Date().toISOString().substr(0, 7),
      }
    },

    methods: {
      emitDate() {
        this.$emit("get:date", this.date);
      }
    },

    props: {
      labelText: { type: String, required: true },
      enabled: { type: Boolean, required: true },
    }
  };
</script>