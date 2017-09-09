import { Bert } from 'meteor/themeteorchef:bert';

export const showAlert = ({ type, message } = {}) => (
  () => {
    Bert.alert(message, type, 'growl-top-right');
  }
);
