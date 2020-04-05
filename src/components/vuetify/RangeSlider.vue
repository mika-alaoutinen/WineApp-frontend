<template>
  <div>
    <v-switch
      id="ratingSwitch"
      v-model="enabled"
      :label="$props.switchLabel"
      @change="flipSwitch"
    />

    <v-range-slider
      v-model="range"
      :disabled="!enabled"
      :min="$props.defaultRange[0]"
      :max="$props.defaultRange[1]"
      :step="$props.step"
      @change="emitRange"
    >
      <template v-slot:prepend>
        <v-text-field
          v-model="range[0]"
          class="slider-value-field"
          single-line
          type="number"
        />
      </template>

      <template v-slot:append>
        <v-text-field
          v-model="range[1]"
          class="slider-value-field"
          single-line
          type="number"
        />
      </template>
    </v-range-slider>
  </div>
</template>

<script>
  export default {

    props: {
      defaultRange: { type: Array, required: true },
      step: { type: Number, required: false, default: 1 },
      switchLabel: { type: String, required: false, default: 'Haku päällä' }
    },

    data() {
      return {
        enabled: false,
        range: this.$props.defaultRange,
      }
    },

    methods: {
      emitRange() {
        if (this.enabled) {
          this.$emit('get:range', this.range)
        }
      },

      flipSwitch() {
        this.enabled
          ? this.$emit('get:range', this.range)
          : this.$emit('get:range', '')
      }
    },

  }
</script>

<style scoped>
  .slider-value-field { width: 60px }
  .slider-value-field >>> input { text-align: center }
</style>