<template>
  <v-combobox
    v-bind="$attrs"
    :value="value"
    :search-input="search"
    @input="input"
    @update:search-input="change"
    multiple
    append-icon
    deletable-chips
    chips
  />
</template>

<script>
  export default {
    name: 'VxFieldTags',
    props: {
      value: Array
    },
    data () {
      return {
        search: ''
      }
    },
    methods: {
      input (val) {
        this.$emit('input', val)
      },
      change (e) {
        this.$log.debug(e)
      }
      // change () {
      //   this.$log.debug('change', this.search)
      //   this.$nextTick(() => {
      //     this.$emit('input', [...this.value, ...this.search.split(',')])
      //     this.$nextTick(() => {
      //       this.search = ''
      //     })
      //   })
      // }
    }
  }
</script>
