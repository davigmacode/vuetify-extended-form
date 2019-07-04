<template>
  <v-slider
    v-bind="$attrs"
    :value="value"
    @input="input"
  />
</template>

<script>
  export default {
    name: 'VxFieldSlider',
    props: {
      value: String
    },
    methods: {
      input (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
