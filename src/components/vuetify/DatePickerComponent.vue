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
    computed: {
      setDate() {
        return this.$props.selectedDate === undefined
          ? new Date()
          : this.$props.selectedDate;
      }
    },

    data() {
      return {
        date: this.setDate,
        type: "month",
      }
    },

    mounted() {
      // Set the calendar type, default option is "month":
      this.type = this.$props.calendarType === undefined
        ? "month"
        : this.$props.calendarType;
      
      // If no date is given, set value of date to today:
      this.date = this.$props.selectedDate === undefined
        ? new Date()
        : this.$props.selectedDate;

      // Set date string format based on calendar type:
      this.date = this.type === "month"
        ? this.date.toISOString().substr(0, 7)
        : this.date.toISOString().split('T')[0]
    },

    props: {
      calendarType: { type: String, required: false },
      enabled: { type: Boolean, required: true },
      labelText: { type: String, required: true },
      selectedDate: { type: String, required: false },
    },

    watch: {
      date() {
        this.$emit("get:date", this.date);
      }
    },
  };
</script>