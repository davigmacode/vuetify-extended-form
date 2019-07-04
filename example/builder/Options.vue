<template>
  <v-data-table :headers="headers" :items="value" :headers-length="headers.length + 1" hide-actions disable-initial-sort>
    <template slot="headers" slot-scope="props">
      <tr>
        <th
          class="text-xs-left"
          v-for="(header, i) in props.headers"
          :key="'th-' + i"
          v-text="header.label"/>
        <th class="text-xs-right">
          <v-btn flat icon color="grey" @click="create">
            <v-icon>add</v-icon>
          </v-btn>
        </th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <td
        v-for="(header, i) in headers"
        :key="'td-' + i"
        class="text-xs-left">
        <v-edit-dialog
          lazy
          :return-value.sync="props.item[header.value]"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close">
          {{ props.item[header.value] }}
          <v-text-field
            slot="input"
            v-model="props.item[header.value]"
            :label="header.label"
            single-line
          />
        </v-edit-dialog>
      </td>
      <td class="text-xs-right">
        <v-btn flat icon color="grey" @click="remove(props.index)">
          <v-icon>close</v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    props: {
      headers: {
        type: Array,
        default: () => ([])
      },
      value: {
        type: Array,
        default: () => ([])
      }
    },
    methods: {
      create () {
        // let newbie = {}
        // for (let i = 0; i < this.headers.length; i++) {
        //   const header = this.headers[i];
        //   newbie[header.value] = 'Click to Edit'
        // }
        let value = this.value
        value.push({})
        this.$emit('input', value)
      },
      remove (i) {
        let value = this.value
        value.splice(i, 1)
        this.$emit('input', value)
      },
      save () {
        console.log('Dialog saved')
      },
      cancel () {
        console.log('Dialog canceled')
      },
      open () {
        console.log('Dialog opened')
      },
      close () {
        console.log('Dialog closed')
      }
    }
  }
</script>
