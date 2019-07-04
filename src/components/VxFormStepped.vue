<template>
  <v-layout column fill-height class="ma-0 vx-form-stepped">
    <slot name="header"/>
    <v-flex :class="wrapperClass">
      <component
        :is="view"
        :schemes="schemes"
        :values="values"
        @change="onChange"
      />
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'VxFormStepped',
    components: {
      VxFormSteppedHorizontal: () => import('./VxFormSteppedHorizontal'),
      VxFormSteppedVertical: () => import('./VxFormSteppedVertical')
    },
    model: {
      prop: 'values',
      event: 'change'
    },
    props: {
      fillHeight: {
        type: Boolean,
        default: false
      },
      vertical: {
        type: Boolean,
        default: false
      },
      schemes: {
        type: Array,
        required: true
      },
      values: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        valid: false,
        caches: {}
      }
    },
    computed: {
      wrapperClass () {
        return {
          'vx-form-stepped-content': true,
          'overflow-y-auto': this.fillHeight,
          'zero-height': this.fillHeight
        }
      },
      view () {
        return 'vx-form-stepped-' + (this.vertical ? 'vertical' : 'horizontal')
      }
    },
    methods: {
      onChange (values) {
        this.$emit('change', values)
      }
    }
  }
</script>
