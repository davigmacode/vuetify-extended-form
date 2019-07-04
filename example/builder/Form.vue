<template>
  <vx-form
    tabbed
    :schemes="schemes"
    v-model="values"
    @submit="onSubmit"/>
</template>

<script>
  export default {
    name: 'BuilderForm',
    data () {
      return {
        values: {
          basic: {
            type: 'text',
            grids: 'xs3|md6'
          },
          choices: {
            items: [
              { value: 'date', label: 'Date' },
              { value: 'text', label: 'Text' },
              { value: 'textarea', label: 'Textarea' },
              { value: 'password', label: 'Password' },
            ]
          }
        }
      }
    },
    computed: {
      schemes () {
        return [
          {
            slug: 'basic',
            title: 'Basic',
            fields: [
              {
                type: 'text',
                slug: 'name',
                label: 'Name',
                placeholder: 'Field Name',
                grids: 'md7',
                params: {
                  counter: 30,
                  clearable: true
                },
                rules: {
                  required: true,
                  maxLength: [30]
                }
              },
              {
                type: 'select',
                slug: 'type',
                label: 'Type',
                placeholder: 'Pick a Field Type',
                grids: 'md5',
                options: [
                  { value: 'date', label: 'Date' },
                  { value: 'text', label: 'Text' },
                  { value: 'textarea', label: 'Textarea' },
                  { value: 'password', label: 'Password' },
                  { value: 'select', label: 'Select' },
                  { value: 'radios', label: 'Radios' },
                  { value: 'checkbox', label: 'Checkbox' },
                  { value: 'checkboxes', label: 'Checkboxes' },
                  { value: 'switch', label: 'Switch' },
                  { value: 'switches', label: 'Switches' },
                  { value: 'slider', label: 'Slider' },
                  { value: 'rating', label: 'Rating' },
                  { value: 'grids', label: 'Responsive' },
                ],
                params: {

                },
                rules: 'required'
              },
              {
                type: 'text',
                slug: 'slug',
                label: 'Slug',
                placeholder: 'Field Slug',
                grids: 'md5',
                params: {
                  counter: 35,
                  clearable: true
                },
                rules: {
                  required: true,
                  maxLength: [35]
                }
              },
              {
                type: 'text',
                slug: 'placeholder',
                label: 'Placeholder',
                placeholder: 'Field Placeholder',
                grids: 'md7',
                params: {
                  counter: 60,
                  clearable: true
                },
                rules: 'maxLength:60'
              },
              {
                type: 'text',
                slug: 'hint',
                label: 'Hint',
                placeholder: 'Field Hint',
                grids: 'md6',
                params: {
                  counter: 100,
                  clearable: true
                },
                rules: 'maxLength:100'
              },
              {
                type: 'text',
                slug: 'rules',
                label: 'Rules',
                placeholder: 'Validation Rules',
                grids: 'md6',
                params: {
                  clearable: true
                }
              },
              {
                type: 'grids',
                slug: 'grids',
                label: 'Responsive Grids',
                grids: 'md12',
                params: {
                  sizes: 'sm|md|lg'
                }
              }
            ]
          },
          {
            skip: !this.typeIs(['select', 'radios', 'checkboxes', 'switches']),
            slug: 'choices',
            title: 'Choices',
            fields: [
              {
                type: 'list',
                slug: 'items',
                hint: 'Custom character mask to the input',
                grids: 'md12',
                params: {
                  persistentHint: true,
                  headers: [
                    { value: 'value', label: 'Value' },
                    { value: 'label', label: 'Label' }
                  ]
                }
              }
            ]
          },
          {
            slug: 'advanced',
            title: 'Advanced',
            fields: [
              {
                type: 'text',
                slug: 'prefix',
                label: 'Prefix',
                placeholder: 'Field Prefix',
                grids: 'md6',
                params: {
                  clearable: true
                }
              },
              {
                type: 'text',
                slug: 'suffix',
                label: 'Suffix',
                placeholder: 'Field Suffix',
                grids: 'md6',
                params: {
                  clearable: true
                }
              },
              {
                type: 'text',
                slug: 'color',
                label: 'Color',
                placeholder: 'Field Color',
                grids: 'md5',
                params: {
                  clearable: true
                }
              },
              {
                type: 'text',
                slug: 'background',
                label: 'Background',
                placeholder: 'Field Background Color',
                grids: 'md7',
                params: {
                  clearable: true
                }
              },
              {
                type: 'text',
                slug: 'counter',
                label: 'Counter',
                placeholder: 'Field Counter',
                hint: 'Counter for input length',
                grids: 'md5',
                params: {
                  clearable: true
                }
              },
              {
                type: 'text',
                slug: 'mask',
                label: 'Mask',
                placeholder: 'Field Mask',
                hint: 'Custom character mask to the input',
                grids: 'md7',
                params: {
                  clearable: true
                }
              },
              {
                skip: !this.typeIs('textarea'),
                type: 'text',
                slug: 'rows',
                label: 'Rows',
                placeholder: 'Field Rows',
                grids: 'md6',
                params: {
                  clearable: true
                }
              },
              {
                skip: !this.typeIs('textarea'),
                type: 'text',
                slug: 'rowHeight',
                label: 'Row Height',
                placeholder: 'Field Row Height',
                grids: 'md6',
                params: {
                  clearable: true
                }
              },
              {
                type: 'select',
                slug: 'params',
                label: 'Parameters',
                placeholder: 'Pick one or more Field Parameters',
                grids: 'md12',
                options: [
                  { value: 'autofocus', label: 'Autofocus' },
                  { value: 'auto-grow', label: 'Autogrow', skip: !this.typeIs('textarea') },
                  { value: 'chips', label: 'Chips', skip: !this.typeIs('select') },
                  { value: 'small-chips', label: 'Small Chips', skip: !this.typeIs('select') },
                  { value: 'deletable-chips', label: 'Deletable Chips', skip: !this.typeIs('select') },
                  { value: 'hide-selected', label: 'Hide Selected', skip: !this.typeIs('select') },
                  { value: 'multiple', label: 'Multiple', skip: !this.typeIs('select') },
                  { value: 'open-on-clear', label: 'Open on Clear', skip: !this.typeIs('select') },
                  { value: 'return-object', label: 'Return Object', skip: !this.typeIs('select') },
                  { value: 'dense', label: 'Dense', skip: !this.typeIs('select') },
                  { value: 'column', label: 'Column', skip: !this.typeIs('radios') },
                  { value: 'row', label: 'Row', skip: !this.typeIs('radios') },
                  { value: 'clearable', label: 'Clearable', skip: this.typeIs('radios') },
                  { value: 'disabled', label: 'Disabled' },
                  { value: 'readonly', label: 'Readonly' },
                  { value: 'full-width', label: 'Full Width', skip: this.typeIs('radios') },
                  { value: 'hide-details', label: 'Hide Details' },
                  { value: 'persistent-hint', label: 'Persistent Hint' },
                  { value: 'return-masked-value', label: 'Return Masked Value', skip: this.typeIs('radios') },
                  { value: 'single-line', label: 'Single Line', skip: this.typeIs('radios') },
                  { value: 'reverse', label: 'Reverse', skip: this.typeIs('radios') }
                ],
                params: {
                  chips: true,
                  multiple: true,
                  deletableChips: true,
                  hideSelected: true,
                  smallChips: true
                },
                rules: 'required'
              },
            ]
          }
        ]
      }
    },
    methods: {
      typeIs (val) {
        let vals = this.values
        let type = vals.basic && vals.basic.type ? vals.basic.type : ''
        return Array.isArray(val) ? val.indexOf(type) !== -1 : type === val
      },
      onSubmit () {
        // console.log(valid)
      }
    }
  }
</script>
