import Inputbox from './Inputbox.vue';

import { action } from '@storybook/addon-actions';

export default {
  component: Inputbox,
  excludeStories: /.*Data$/,
  title: 'Inputbox',
  argTypes: {
    onSetOption: {},
    onToggleNavigation: {},
    onToggleOptions: {},
    onValidateSave: {},
    onResetPrev: {},
    onShowTrash: {},
    onHideTrash: {},
    onResetState: {}
  },
};

export const actionsData = {
  onSetOption: action('set-option'),
  onToggleNavigation: action('toggle-navigation'),
  onToggleOptions: action('toggle-options'),
  onValidateSave: action('validate-save'),
  onResetPrev: action('reset-prev'),
  onShowTrash: action('show-trash'),
  onHideTrash: action('hide-trash'),
  onResetState: action('reset-state')
};

const Template = args => ({
  components: { Inputbox },
  setup() {
    return { args, ...actionsData };
  },
  template: '<Inputbox v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  inputbox: {
    type: 'page',
    open: '',
    validation: true,
    showoptions: false,
    value: 'URL',
  },
};

export const Phone = Template.bind({});
Phone.args = {
  inputbox: {
    ...Default.args.inputbox,
    type: 'phone',
    value: '',
  },
};

export const Email = Template.bind({});
Email.args = {
  inputbox: {
    ...Default.args.inputbox,
    type: 'email',
    value: '',
  },
};