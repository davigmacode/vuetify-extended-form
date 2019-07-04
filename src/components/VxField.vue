<template>
  <v-flex v-if="scheme.type" v-bind="grids">
    <component
      v-bind="params"
      :is="view"
      :value="value"
      @input="input"
    />
  </v-flex>
</template>

<script>
  export default {
    name: 'VxField',
    model: {
      prop: 'value',
      event: 'input'
    },
    components: {
      VxFieldText: () => import('./VxFieldText'),
      VxFieldTextarea: () => import('./VxFieldTextarea'),
      VxFieldSlider: () => import('./VxFieldSlider'),
      VxFieldSelect: () => import('./VxFieldSelect'),
      VxFieldDate: () => import('./VxFieldDate'),
      VxFieldRadios: () => import('./VxFieldRadios'),
      VxFieldChoices: () => import('./VxFieldChoices'),
      VxFieldPassword: () => import('./VxFieldPassword'),
      VxFieldRating: () => import('./VxFieldRating'),
      VxFieldGrids: () => import('./VxFieldGrids'),
      VxFieldList: () => import('./VxFieldList'),
      VxFieldTags: () => import('./VxFieldTags'),
    },
    data () {
      return {
        views: {
          text: 'vx-field-text',
          textarea: 'vx-field-textarea',
          slider: 'vx-field-slider',
          select: 'vx-field-select',
          date: 'vx-field-date',
          radios: 'vx-field-radios',
          switches: 'vx-field-choices',
          checkboxes: 'vx-field-choices',
          password: 'vx-field-password',
          rating: 'vx-field-rating',
          grids: 'vx-field-grids',
          list: 'vx-field-list',
          tags: 'vx-field-tags',
        }
      }
    },
    props: {
      scheme: {
        type: Object,
        default: () => ({})
      },
      value: {
        type: [String, Number, Array, Object]
      }
    },
    computed: {
      params () {
        let scheme = this.scheme
        let params = scheme.params || {}
        params.hint = scheme.hint
        params.label = scheme.label
        params.placeholder = scheme.placeholder
        params.type = scheme.type === 'password'
          ? 'password' : this.typeIs(['select', 'text', 'textarea'])
            ? 'text' : scheme.type

        // build validation rules
        if (scheme.rules) {
          params.rules = this.$validator.parse(scheme.rules)
        }

        // build options for selection controls
        if (this.typeIs(['select', 'radios', 'checkboxes', 'switches'])) {
          params.itemText = params.itemText || 'label'
          params.itemValue = params.itemValue || 'value'
          params.items = scheme.items || scheme.options || params.items || []
          params.items = params.items.filter(item => item.skip !== true)
        }

        return params
      },
      grids () {
        let result = {}
        let values = this.scheme.grids || {}

        // split by separator if values is string
        if (typeof values === 'string') {
          values = values.split(this.separator)
        }
        // convert values to object
        if (Array.isArray(values)) {
          for (let i = 0; i < values.length; i++) {
            result[values[i]] = true
          }
        }
        return result
      },
      view () {
        return this.views[this.scheme.type]
      }
    },
    methods: {
      typeIs (val) {
        let type = this.scheme.type
        return Array.isArray(val) ? val.indexOf(type) !== -1 : type === val
      },
      input (val) {
        this.$emit('input', val)
      },
    }
  }
</script>
