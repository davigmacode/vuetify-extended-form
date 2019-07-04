<template>
  <v-radio-group
    v-bind="$attrs"
    @change="input"
    :value="value">
    <template v-if="$attrs.items">
      <v-radio
        v-for="(opt, i) in $attrs.items"
        v-bind="opt"
        :value="opt[$attrs.itemValue]"
        :label="opt[$attrs.itemText]"
        :key="i"
      />
    </template>
  </v-radio-group>
</template>

<script>
  export default {
    name: 'VxFieldRadios',
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