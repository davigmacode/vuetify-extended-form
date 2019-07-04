<template>
  <v-textarea
    v-bind="$attrs"
    :value="value"
    @input="input"
  />
</template>

<script>
  export default {
    name: 'VxFieldTextarea',
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
