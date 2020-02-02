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
      :disabled=!enabled
      :type="type"
      no-title
      scrollable
      v-model="date">
    </v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    data() {
      return {
        date: new Date(),
        type: "date",
      }
    },

    mounted() {
      // If date is given in props, use it as is:
      if (this.$props.selectedDate !== undefined) {
        this.date = this.$props.selectedDate;
        return;
      }
      
      // Set the calendar type, default option is "date":
      if (this.$props.calendarType !== undefined) {
        this.type = this.$props.calendarType;
      }

      // Format date string based on calendar type: 1) regular calendar 2) month calendar
      this.date = this.type === "date"
        ? this.date.toISOString().split('T')[0]
        : this.date.toISOString().substr(0, 7)
        
    },

    props: {
      enabled: { type: Boolean, required: true },
      labelText: { type: String, required: true },
      calendarType: { type: String, required: false },
      selectedDate: { type: String, required: false },
    },

    watch: {
      date() {
        this.$emit("get:date", this.date);
      }
    },
  };
</script>