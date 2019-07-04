<template>
  <v-input v-bind="$attrs" class="vx-field vx-field-rating">
    <v-rating :value="value" @input="input"></v-rating>
  </v-input>
</template>

<script>
  export default {
    name: 'VxFieldRating',
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
    methods: {
      input (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
