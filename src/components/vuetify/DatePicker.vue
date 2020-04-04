<template>
  <v-menu
    max-width="290px"
    min-width="290px"
    offset-y
    transition="scale-transition"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="dateString"
        :label="$props.labelText"
        readonly
        v-on="on"
      />
    </template>

    <v-date-picker
      v-model="date"
      :disabled="!enabled"
      :type="$props.calendarType"
      no-title
      scrollable
    />
  </v-menu>
</template>

<script>
  export default {
    props: {
      enabled: { type: Boolean, required: true },
      labelText: { type: String, required: true },
      calendarType: { type: String, required: false, default: 'date' },
      selectedDate: { type: String, required: false, default: new Date().toISOString() },
    },

    data() {
      return {
        date: this.$props.selectedDate,
      }
    },

    computed: {
      dateString() {
        return this.formatDate()
      }
    },

    watch: {
      date() {
        this.$emit('get:date', this.formatDate())
      }
    },

    mounted() {
      this.$emit('get:date', this.formatDate())
    },

    methods: {
      formatDate() {
        return this.$props.calendarType === 'date'
          ? this.date.split('T')[0]
          : this.date.substr(0, 7)
      }
    }
  }

</script>