<template>
  <v-input v-bind="$attrs" class="vx-field vx-field-choices">
    <v-container>
      <v-layout row wrap>
        <v-flex class="pa-1" v-bind="layout" v-for="(item, i) in items" :key="i">
          <component
            :is="view"
            :label="item[itemText]"
            :value="item[itemValue]"
            :input-value="value"
            @change="input"
            hide-details
            class="mt-0"
            />
        </v-flex>
      </v-layout>
    </v-container>
  </v-input>
</template>

<script>
  export default {
    name: 'VxFieldChoices',
    props: {
      type: {
        type: String,
        default: 'checkboxes',
      },
      items: {
        type: Array,
        default: () => ([])
      },
      itemDisabled: {
        type: String,
        default: 'disabled'
      },
      itemText: {
        type: String,
        default: 'text',
      },
      itemValue: {
        type: String,
        default: 'value'
      },
      grids: {
        type: [String, Array],
        default: 'md6'
      },
      value: {
        type: Array,
        default: () => ([])
      }
    },
    data () {
      return {
        views: {
          radios: 'v-radio',
          switches: 'v-switch',
          checkboxes: 'v-checkbox'
        }
      }
    },
    computed: {
      view () {
        return this.views[this.type]
      },
      layout () {
        let result = {}
        let values = this.grids || {}

        // split by separator if values is string
        if (typeof values === 'string') {
          values = values.split('|')
        }
        // convert values to object
        if (Array.isArray(values)) {
          for (let i = 0; i < values.length; i++) {
            result[values[i]] = true
          }
        }
        return result
      },
    },
    methods: {
      input (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
