<template>
  <component
    :is="view"
    :input-value="value"
    @change="input"
  />
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
    data () {
      return {
        views: {
          switch: 'v-switch',
          checkbox: 'v-checkbox'
        }
      }
    },
    computed: {
      view () {
        return this.views[this.type]
      }
    },
    methods: {
      input (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
