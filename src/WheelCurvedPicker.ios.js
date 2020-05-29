let PickerIOSComponent;

try {
  PickerIOSComponent = require('@react-native-community/picker').PickerIOS;
} catch (_e) {}

if (!PickerIOSComponent) {
  // Deprecated
  PickerIOSComponent = require('react-native').PickerIOS;
}

export default PickerIOSComponent;
