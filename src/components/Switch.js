import * as React from "react";
import { Switch as NativeSwitch, Platform } from "react-native";
import { withTheme } from "../core/theming";
import {
  GROUPS,
  PROP_TYPES,
  COMPONENT_TYPES,
  FORM_TYPES,
  FIELD_NAME,
} from "../core/component-types";

class Switch extends React.Component {
  render() {
    const {
      value,
      disabled,
      onValueChange,
      color,
      theme,
      ...props
    } = this.props;
    let thumbColor;
    let checkedColor = color || theme.colors.primary;
    if (Platform.OS !== "ios") {
      thumbColor = theme.colors.surface;
    }
    return (
      <NativeSwitch
        {...props}
        value={value}
        disabled={disabled}
        trackColor={{ false: null, true: checkedColor }}
        thumbColor={thumbColor}
        onValueChange={disabled ? undefined : onValueChange}
        style={{
          opacity:
            disabled && Platform.OS !== "ios" ? theme.disabledOpacity : 1,
        }}
      />
    );
  }
}

export default withTheme(Switch);

export const SEED_DATA = {
  name: "Switch",
  tag: "Switch",
  category: COMPONENT_TYPES.input,
  preview_image_url: "{CLOUDINARY_URL}/Control_Toggle.png",
  props: {
    disabled: {
      group: GROUPS.data,
      label: "Disabled",
      description: "Boolean to handle disabling the switch",
      required: false,
      editable: true,
      defaultValue: false,
      formType: FORM_TYPES.boolean,
      propType: PROP_TYPES.BOOLEAN,
    },
    color: {
      group: GROUPS.basic,
      label: "Color",
      description: "Custom color for switch",
      editable: true,
      defaultValue: null,
      required: false,
      formType: FORM_TYPES.color,
      propType: PROP_TYPES.STRING,
    },
    fieldName: {
      ...FIELD_NAME,
      defaultValue: "switchValue",
      handlerPropName: "onValueChange",
    },
  },
  layout: {},
};
