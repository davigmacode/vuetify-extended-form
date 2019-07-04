<template>
  <v-menu
    ref="menu"
    v-model="menu"
    min-width="290px"
    transition="scale-transition"
    :close-on-content-click="false"
    full-width
    offset-y
    lazy>
    <v-text-field
      slot="activator"
      :value="formatted"
      @input="input"
      v-bind="$attrs"
      clearable
      readonly
    />
    <v-date-picker
      :value="value"
      @input="input"
      no-title
    />
  </v-menu>
</template>

<script>
  export default {
    name: 'VxFieldDate',
    props: {
      value: {
        type: String,
        default: ''
      },
      format: {
        type: String,
        default: 'MMM Do YYYY'
      }
    },
    data () {
      return {
        menu: false
      }
    },
    computed: {
      formatted () {
        if (this.$filters && this.$filters.date) {
          return this.$filters.date(this.value, this.format)
        } else {
          return this.value
        }
      }
    },
    methods: {
      input (val) {
        this.menu = false
        this.$emit('input', val)
      }
    }
  }
</script>
