<template>
  <v-text-field
    v-bind="$attrs"
    :value="value"
    @input="input"
  />
</template>

<script>
  export default {
    name: 'VxFieldText',
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
