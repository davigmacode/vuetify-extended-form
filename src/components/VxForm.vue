<template>
  <component
    :is="view"
    :schemes="filtered"
    :values="values"
    @change="onChange"
    v-bind="$attrs"
  />
</template>

<script>
  export default {
    name: 'VxForm',
    components: {
      VxFormSingle: () => import('./VxFormSingle'),
      VxFormStepped: () => import('./VxFormStepped'),
      VxFormTabbed: () => import('./VxFormTabbed')
    },
    model: {
      prop: 'values',
      event: 'change'
    },
    props: {
      tabbed: {
        type: Boolean,
        default: false
      },
      stepped: {
        type: Boolean,
        default: false
      },
      schemes: {
        type: Array,
        default: () => ([])
      },
      values: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      filtered () {
        return this.schemes.filter(scheme => scheme.skip !== true)
      },
      view () {
        return this.stepped ? 'vx-form-stepped'
          : this.tabbed ? 'vx-form-tabbed'
          : 'vx-form-single'
      }
    },
    methods: {
      onChange (values) {
        this.$emit('change', values)
      }
    }
  }
</script>

<style>
.vx-field > .v-input__control > .v-input__slot {
  flex-wrap: wrap;
}
.vx-field > .v-input__control > .v-input__slot > .v-label {
  margin-bottom: 8px !important;
  width: 100%;
}
.vx-field-choices .v-input--selection-controls .v-input__slot {
  margin-bottom: 0 !important;
}
.vx-field-choices .v-messages {
  margin-top: 10px;
}
.vx-field-choices .container {
  padding: 1px;
}
.vx-field-list-table {
  width: 100%;
  border: 1px solid #ddd;
}
.vx-form-stepped .v-stepper__label small {
  font-weight: 400;
}
</style>
