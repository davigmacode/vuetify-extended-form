<template>
  <v-select
    v-bind="$attrs"
    :value="value"
    @input="input"
  />
</template>

<script>
  export default {
    name: 'VxFieldSelect',
    props: {
      value: [String, Array]
    },
    methods: {
      input (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
