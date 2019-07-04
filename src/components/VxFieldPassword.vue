<template>
  <v-text-field
    v-bind="$attrs"
    :value="value"
    :type="visible ? 'text' : 'password'"
    :append-icon="visible ? 'visibility_off' : 'visibility'"
    @click:append="visible = !visible"
    @input="input"
  />
</template>

<script>
  export default {
    name: 'VxFieldPassword',
    props: {
      value: String
    },
    data () {
      return {
        visible: false
      }
    },
    methods: {
      input (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
