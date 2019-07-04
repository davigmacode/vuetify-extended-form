import Vue from 'vue'
import App from './App.vue'
import {
  Vuetify,
  VApp,
  VGrid,
  VCard,
  VMenu,
  VBtn,
  VForm,
  VIcon,
  VInput,
  VSelect,
  VTextarea,
  VTextField,
  VDatePicker,
  VRadioGroup,
  VCheckbox,
  VSwitch,
  VRating,
  VSlider,
  VDataTable,
  VStepper,
  VTabs,
  VDivider,
  VToolbar
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

import VxForm from '../src'

Vue.use(Vuetify, {
  components: {
    VApp,
    VGrid,
    VCard,
    VMenu,
    VBtn,
    VForm,
    VIcon,
    VInput,
    VSelect,
    VTextarea,
    VTextField,
    VDatePicker,
    VRadioGroup,
    VCheckbox,
    VSwitch,
    VRating,
    VSlider,
    VDataTable,
    VStepper,
    VTabs,
    VDivider,
    VToolbar
  }
})
Vue.use(VxForm)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
