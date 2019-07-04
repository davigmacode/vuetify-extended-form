<template>
  <div class="vx-form-tabbed">
    <v-tabs :dark="dark" :color="tabColor" :slider-color="sliderColor" :show-arrows="pager" v-bind="$attrs">
      <v-tab v-for="(item) in schemes" :href="'#' + target(item.slug)" :key="'tab' + target(item.slug)">
        {{ item.title }}
      </v-tab>
      <v-tabs-items>
        <v-tab-item v-for="(item) in schemes" :id="target(item.slug)" :key="'tab-item' + target(item.slug)">
          <vx-form-single
            class="pa-2"
            :schemes="item.fields"
            :placeholder="item.placeholder"
            v-model="caches[item.slug]"
            hideActions
            dense flat/>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
    <v-layout :class="actionsClass" v-if="!hideActions">
      <slot name="actions" :valid="valid">
        <v-btn
          flat
          type="submit"
          :disabled="!valid"
          :color="btnSubmitColor"
          v-text="btnSubmitLabel"/>
        <v-btn
          flat
          :color="btnCancelColor"
          v-text="btnCancelLabel"
          @click="cancel"/>
      </slot>
    </v-layout>
  </div>
</template>

<script>
  import VxFormSingle from './VxFormSingle'

  export default {
    name: 'VxFormTabbed',
    components: {
      VxFormSingle
    },
    model: {
      prop: 'values',
      event: 'change'
    },
    props: {
      id: {
        type: String,
        default: 'form'
      },
      dark: {
        type: Boolean,
        default: false
      },
      pager: {
        type: Boolean,
        default: false
      },
      hideActions: {
        type: Boolean,
        default: false
      },
      btnSubmitLabel: {
        type: String,
        default: 'Submit'
      },
      btnCancelLabel: {
        type: String,
        default: 'Cancel'
      },
      btnSubmitColor: {
        type: String,
        default: 'primary'
      },
      btnCancelColor: {
        type: String,
        default: 'grey'
      },
      tabColor: {
        type: String,
        default: 'grey lighten-4'
      },
      actionsColor: {
        type: String,
        default: 'grey lighten-4'
      },
      actionsAlign: {
        type: String,
        default: 'right'
      },
      sliderColor: {
        type: String,
        default: 'blue-grey'
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
      actionsClass () {
        let align = this.actionsAlign
        return {
          'ma-0': true,
          'pa-1': true,
          'justify-end': align === 'right',
          'justify-start': align === 'left',
          'justify-center': align === 'center',
          'justify-space-around': align === 'around',
          'justify-space-between': align === 'between',
          [this.actionsColor]: true
        }
      }
    },
    watch: {
      caches: {
        deep: true,
        handler (val) {
          this.$emit('change', val)
        }
      }
    },
    methods: {
      populate () {
        let schemes = this.schemes
        let defaults = this.values
        if (schemes && Array.isArray(schemes)) {
          for (let i = 0; i < schemes.length; i++) {
            let item = schemes[i]
            if (defaults[item.slug]) {
              this.$set(this.caches, item.slug, defaults[item.slug])
            } else if (item.default) {
              this.$set(this.caches, item.slug, item.default)
            } else {
              // set default based on field type
              this.$set(this.caches, item.slug, {})
            }
          }
        }
      },
      target (slug) {
        return this.id + '-' + slug
      },
      submit () {
        this.$emit('submit')
      },
      cancel () {
        this.$emit('cancel')
      }
    },
    created () {
      this.populate()
    }
  }
</script>
