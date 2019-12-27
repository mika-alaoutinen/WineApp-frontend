<template>
  <div>
    <v-switch
      @change="emitSwitchState"
      :label="$props.switchLabel"
      v-model="enabled">
    </v-switch>

    <v-range-slider
      @change="emitRange"
      :disabled="!enabled"
      :min="$props.defaultRange[0]"
      :max="$props.defaultRange[1]"
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
      emitSwitchState() {
        this.$emit("get:switch", this.enabled);
      },

      emitRange() {
        if (this.enabled) {
          console.log("emitting values");
          this.$emit("get:range", this.range);
        } else {
          console.log("default values");
          this.$emit("get:range", this.$props.defaultRange);
        }
      },
    },

    props: {
      defaultRange: { type: Array, required: true },
      switchLabel: { type: String, required: true }
    },

};
</script>

<style scoped>
  .slider-value-field { width: 60px }
  .slider-value-field >>> input { text-align: center }
</style>