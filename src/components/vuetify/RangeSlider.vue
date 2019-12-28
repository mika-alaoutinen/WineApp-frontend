<template>
  <div>
    <v-switch
      @change="flipSwitch"
      :label="$props.switchLabel"
      v-model="enabled">
    </v-switch>

    <v-range-slider
      @change="emitRange"
      :disabled="!enabled"
      :min="$props.defaultRange[0]"
      :max="$props.defaultRange[1]"
      :step="$props.step"
      v-model="range">

      <template v-slot:prepend>
        <v-text-field
          class="slider-value-field"
          single-line
          type="number"
          v-model="range[0]">
        </v-text-field>
      </template>

      <template v-slot:append>
        <v-text-field
          class="slider-value-field"
          single-line
          type="number"
          v-model="range[1]">
        </v-text-field>
      </template>
    </v-range-slider>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        enabled: false,
        range: this.$props.defaultRange,
      }
    },

    methods: {
      emitRange() {
        if (this.enabled) {
          this.$emit("get:range", this.range);
        }
      },

      flipSwitch() {
        this.enabled
          ? this.$emit("get:range", this.range)
          : this.$emit("get:range", this.$props.defaultRange);
      }
    },

    props: {
      defaultRange: { type: Array, required: true },
      step: { type: Number, required: true }, // TODO: how to handle non-required props?
      switchLabel: { type: String, required: true }
    },

};
</script>

<style scoped>
  .slider-value-field { width: 60px }
  .slider-value-field >>> input { text-align: center }
</style>