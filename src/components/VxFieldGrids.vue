<template>
  <v-input v-bind="$attrs" class="vx-field">
    <v-layout class="ma-0" row>
      <v-flex class="shrink pa-0" v-for="(size, key) in whitelisted" :key="key">
        <v-select
          placeholder="Grid Size"
          @input="input(key, $event)"
          :label="size"
          :value="caches[key]"
          :items="points(key)"
          hide-details
          clearable
        />
      </v-flex>
    </v-layout>
  </v-input>
</template>

<script>
  export default {
    name: 'VxFieldGrids',
    props: {
      sizes: {
        type: [String, Array],
        default: 'xs|sm|md|lg|xl'
      },
      separator: {
        type: String,
        default: '|'
      },
      value: {
        type: [String, Array],
        default: ''
      }
    },
    data () {
      return {
        dimensions: {
          xs: 'Extra Small Screen',
          sm: 'Small Screen',
          md: 'Medium Screen',
          lg: 'Large Screen',
          xl: 'Extra Large Screen',
        }
      }
    },
    computed: {
      whitelisted () {
        let result = {}
        let dimensions = this.dimensions
        let sizes = this.sizes

        // split by separator if values is string
        if (typeof sizes === 'string') {
          sizes = sizes.split(this.separator)
        }

        // build whitelisted sizes
        for (let i = 0; i < sizes.length; i++) {
          const size = sizes[i]
          if (dimensions[size]) {
            result[size] = dimensions[size]
          }
        }

        return result
      },
      caches () {
        let result = {}
        let values = this.value
        // split by separator if values is string
        if (typeof values === 'string') {
          values = values.split(this.separator)
        }
        // convert values to object
        for (let i = 0; i < values.length; i++) {
          let value = values[i]
          let size = value.substr(0, 2)
          let point = parseInt(value.substr(2))
          result[size] = point
        }
        return result
      }
    },
    methods: {
      points (size) {
        let max = 12
        let result = []
        for (let i = 1; i <= max; i++) {
          result.push({
            text: size + i,
            value: i
          })
        }
        return result
      },
      input (size, point) {
        let values = []
        let caches = this.caches
        caches[size] = point
        for (let key in caches) {
          // skip loop if the property is from prototype
          if (!caches.hasOwnProperty(key)) continue
          // set value
          if (caches[key]) {
            values.push(key + caches[key])
          }
        }

        // convert to string if value from prop not an array
        if (!Array.isArray(this.value)) {
          values = values.join(this.separator)
        }
        this.$emit('input', values)
      }
    }
  }
</script>

