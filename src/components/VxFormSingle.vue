<template>
  <v-card tile :flat="flat" class="fill-height">
    <v-form ref="form" @submit.prevent.stop="submit" v-model="valid" lazy-validation class="fill-height">
      <v-layout column fill-height class="ma-0">
        <slot name="header" :valid="valid">
          <v-toolbar
            v-if="!!title"
            :dark="titleColor === 'light'"
            :light="titleColor === 'dark'"
            :color="titleBackground"
            flat>
            <v-icon v-if="!!icon">{{ icon }}</v-icon>
            <v-toolbar-title class="headline" v-text="title"/>
          </v-toolbar>
        </slot>
        <v-flex :class="fieldClass">
          <v-container class="pa-0 ma-0" grid-list-lg fluid>
            <v-layout row wrap>
              <v-card-text v-if="!!message" v-html="message" class="pa-2"/>
              <template v-if="schemes.length > 0">
                <template v-for="scheme in schemes">
                  <vx-field
                    :key="scheme.slug"
                    :scheme="scheme"
                    :value="value(scheme)"
                    @input="change(scheme.slug, $event)"
                    v-if="!scheme.skip"/>
                </template>
              </template>
              <v-layout style="min-height:200px" align-center justify-center v-else>
                <span class="grey--text">{{ placeholder }}</span>
              </v-layout>
            </v-layout>
          </v-container>
        </v-flex>
        <v-card-actions class="px-4 pb-4 pt-0" v-if="!hideActions">
          <slot name="actions" :valid="valid">
            <v-spacer/>
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
        </v-card-actions>
      </v-layout>
    </v-form>
  </v-card>
</template>

<script>
  import VxField from './VxField'
  import has from 'lodash/has'

  export default {
    name: 'VxFormSingle',
    components: {
      VxField
    },
    model: {
      prop: 'values',
      event: 'change'
    },
    props: {
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
      icon: {
        type: String
      },
      message: {
        type: String
      },
      title: {
        type: String
      },
      titleColor: {
        type: String,
        default: 'light'
      },
      titleBackground: {
        type: String,
        default: 'primary'
      },
      fillHeight: {
        type: Boolean,
        default: false
      },
      flat: {
        type: Boolean,
        default: false
      },
      dense: {
        type: Boolean,
        default: false
      },
      grouped: {
        type: Boolean,
        default: false
      },
      hideActions: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        required: false
      },
      schemes: {
        type: Array,
        required: true,
        default: () => ([])
      },
      values: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        valid: false,
        // caches: {}
      }
    },
    computed: {
      fieldClass () {
        return {
          'pa-2': this.dense,
          'pa-4': !this.dense,
          'overflow-y-auto': this.fillHeight,
          'zero-height': this.fillHeight
        }
      }
    },
    // watch: {
    //   caches: {
    //     deep: true,
    //     handler (val) {
    //       this.$emit('change', val)
    //     }
    //   }
    // },
    methods: {
      reset () {
        return this.$refs.form.reset()
      },
      validate () {
        return this.$refs.form.validate()
      },
      submit () {
        this.$emit('submit', this.validate())
      },
      cancel () {
        this.$emit('cancel')
      },
      change (slug, value) {
        this.$emit('change', { ...this.values, [slug]: value })
      },
      value (scheme) {
        let slug = scheme.slug
        let values = this.values
        if (has(values, slug)) {
          return values[slug]
        } else if (has(scheme, 'default')) {
          return scheme.default
        } else {
          // todo: set default based on field type
          return null
        }
      },
      // populate () {
      //   this.$nextTick(() => {
      //     let schemes = this.schemes
      //     let defaults = this.values
      //     this.$log.debug(defaults)
      //     if (schemes && Array.isArray(schemes)) {
      //       for (let i = 0; i < schemes.length; i++) {
      //         let scheme = schemes[i]
      //         if (has(defaults, scheme.slug)) {
      //           this.$set(this.caches, scheme.slug, defaults[scheme.slug])
      //         } else if (has(scheme, 'default')) {
      //           this.$set(this.caches, scheme.slug, scheme.default)
      //         } else {
      //           // set default based on field type
      //           // this.$set(this.caches, scheme.slug, null)
      //         }
      //       }
      //     }
      //   })
      // }
    },
    activated () {
      this.reset()
    },
    // updated () {
    //   this.populate()
    // }
  }
</script>
