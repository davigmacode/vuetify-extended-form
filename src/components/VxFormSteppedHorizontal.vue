<template>
  <v-stepper v-model="step" class="elevation-0">
    <v-stepper-header class="elevation-0">
      <template v-for="(item, i) in schemes">
        <v-stepper-step :complete="current(step) > current(i)" :step="current(i)" :key="'step-' + current(i)">
          {{ item.title }} <small>{{ item.subtitle }}</small>
        </v-stepper-step>
        <v-divider v-if="current(i) < schemes.length" :key="'step-divider-' + current(i)"></v-divider>
      </template>
    </v-stepper-header>
    <v-stepper-items>
      <template v-for="(item, i) in schemes">
        <v-stepper-content :step="current(i)" :key="'content-' + current(i)" class="py-0">
          <vx-form-single
            :schemes="item.fields"
            :placeholder="item.placeholder"
            v-model="caches[item.slug]"
            @submit="next(current(i), $event)"
            flat dense>
            <template slot="actions" slot-scope="props">
              <v-btn depressed class="ma-0" color="primary" :disabled="!props.valid" type="submit">Continue</v-btn>
              <v-btn flat @click="prev(current(i))" v-if="current(i) > 1">Back</v-btn>
              <v-spacer/>
            </template>
          </vx-form-single>
        </v-stepper-content>
      </template>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import VxFormSingle from './VxFormSingle'

  export default {
    name: 'VxFormSteppedHorizontal',
    components: {
      VxFormSingle
    },
    model: {
      prop: 'values',
      event: 'change'
    },
    props: {
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
        caches: {},
        step: 1
      }
    },
    computed: {
      completed () {
        return this.step === this.schemes.length
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
      current (i) {
        return i + 1
      },
      prev (i) {
        if (i !== 1) {
          this.step = i - 1
        }
      },
      next (i, valid) {
        if (valid) {
          if (i !== this.schemes.length) {
            this.step = i + 1
          }
        }
      }
    },
    created () {
      this.populate()
    }
  }
</script>
