import VxForm from './components/VxForm'
import VxFormSingle from './components/VxFormSingle'
import VxFormStepped from './components/VxFormStepped'

class Plugin {
  install (Vue) {
    Vue.component(VxForm.name, VxForm)
    Vue.component(VxFormSingle.name, VxFormSingle)
    Vue.component(VxFormStepped.name, VxFormStepped)
  }
}

export {
  VxForm,
  VxFormSingle,
  VxFormStepped
}

export default new Plugin()
