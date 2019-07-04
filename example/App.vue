<template>
  <v-app>
    <v-container grid-list-lg>
      <v-layout align-center justify-center>
        <v-flex md6>
          <form-builder class="elevation-1"/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import FormBuilder from './builder/Main'

  export default {
    name: 'app',
    components: {
      FormBuilder
    },
    data () {
      return {
        builder: {}
      }
    }
  }
</script>

<style>
html,
body {
  overflow: auto !important;
}
</style>
