import {
  GROUPS,
  COMPONENT_TYPES,
  FORM_TYPES,
  PROP_TYPES,
  FIELD_NAME,
  Triggers,
  StylesPanelSections,
} from "@draftbit/types";

export const SEED_DATA_PROPS = {
  style: {
    group: GROUPS.basic,
    label: "Style",
    description: "Text Style",
    editable: false,
    required: false,
    formType: FORM_TYPES.typeStyle,
    propType: PROP_TYPES.THEME,
    defaultValue: null,
  },
  clearButtonMode: {
    group: GROUPS.basic,
    label: "Clear Button Mode",
    description:
      "Enables a button within the textInput to clear the data entered",
    editable: true,
    required: false,
    options: ["never", "while-editing", "unless-editing", "always"],
    defaultValue: null,
    formType: FORM_TYPES.flatArray,
    propType: PROP_TYPES.STRING,
  },
  clearTextOnFocus: {
    group: GROUPS.basic,
    label: "Clear Text on Focus",
    description:
      "If true, clears the text field automatically when its focused.",
    editable: true,
    required: false,
    defaultValue: null,
    formType: FORM_TYPES.boolean,
    propType: PROP_TYPES.BOOLEAN,
  },
  enablesReturnKeyAutomatically: {
    group: GROUPS.basic,
    label: "Enables Return Key Automatically",
    description:
      "If true, the keyboard disables the return key when there is no text and automatically enables it when there is (Default: false)",
    editable: true,
    required: false,
    defaultValue: null,
    formType: FORM_TYPES.boolean,
    propType: PROP_TYPES.BOOLEAN,
  },
  underlineColorAndroid: {
    group: GROUPS.basic,
    label: "Underline color",
    description:
      "(Android Only) The color of the underline(the line underneath the text when finished typing.",
    editable: true,
    required: false,
    defaultValue: null,
    formType: FORM_TYPES.color,
    propType: PROP_TYPES.THEME,
  },
  fieldName: {
    ...FIELD_NAME,
    defaultValue: "textInputValue",
    handlerPropName: "onChangeText",
  },
};

export const SEED_DATA = [
  {
    name: "Text Input",
    tag: "TextInput",
    description: "An input field that allows users to type in data.",
    category: COMPONENT_TYPES.input,
    stylesPanelSections: [
      StylesPanelSections.Typography,
      StylesPanelSections.Background,
      StylesPanelSections.Size,
      StylesPanelSections.MarginsAndPaddings,
      StylesPanelSections.Position,
      StylesPanelSections.Borders,
      StylesPanelSections.Effects,
    ],
    preview_image_url:
      "https://res.cloudinary.com/altos/image/upload/draftbit/Jigsaw/TextInput.png",
    supports_list_render: false,
    layout: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: "divider",
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
      paddingBottom: 8,
      borderRadius: 8,
    },
    triggers: [Triggers.OnChangeText],
    props: {
      allowFontScaling: {
        group: GROUPS.advanced,
        label: "Allow Font Scaling",
        description:
          "Whether fonts should scale to respect Text Size in the user's accessibility settings. (Default: true)",
        editable: true,
        required: false,
        defaultValue: null,
        formType: FORM_TYPES.boolean,
        propType: PROP_TYPES.BOOLEAN,
      },
      autoCapitalize: {
        group: GROUPS.advanced,
        label: "Auto Capitalize",
        description:
          "Can automatically capitalize sentences, words, and characters (Default: none).",
        editable: true,
        required: false,
        defaultValue: null,
        options: ["none", "sentences", "words", "characters"],
        formType: FORM_TYPES.flatArray,
        propType: PROP_TYPES.STRING,
      },
      autoCorrect: {
        group: GROUPS.advanced,
        label: "Auto Correct",
        description: "Enables auto correction",
        editable: true,
        required: false,
        defaultValue: null,
        formType: FORM_TYPES.boolean,
        propType: PROP_TYPES.BOOLEAN,
      },
      autoFocus: {
        group: GROUPS.basic,
        label: "Auto Focus",
        description: "Focuses the input on load in and brings up the keyboard",
        editable: true,
        required: false,
        defaultValue: null,
        formType: FORM_TYPES.boolean,
        propType: PROP_TYPES.BOOLEAN,
      },
      caretHidden: {
        group: GROUPS.advanced,
        label: "Hide Caret",
        description:
          "Hides the caret(the line small line underneath each showing where you're editing/typing",
        editable: true,
        required: false,
        defaultValue: null,
        formType: FORM_TYPES.boolean,
        propType: PROP_TYPES.BOOLEAN,
      },
      contextMenuHidden: {
        group: GROUPS.advanced,
        label: "Hide Context Menu",
        description: "Hides the system context menu (Default: false)",
        editable: true,
        required: false,
        defaultValue: null,
        formType: FORM_TYPES.boolean,
        propType: PROP_TYPES.BOOLEAN,
      },
      editable: {
        group: GROUPS.advanced,
        label: "Editable",
        description: "If false, the text is not editable",
        editable: true,
        required: false,
        defaultValue: true,
        formType: FORM_TYPES.boolean,
        propType: PROP_TYPES.BOOLEAN,
      },
      keyboardAppearance: {
        group: GROUPS.advanced,
        label: "Keyboard Appearance",
        description: "Determines the color of the keyboard.(iOS Only)",
        editable: true,
        required: false,
        defaultValue: null,
        options: ["default", "light", "dark"],
        formType: FORM_TYPES.flatArray,
        propType: PROP_TYPES.STRING,
      },
      keyboardType: {
        group: GROUPS.advanced,
        label: "Keyboard Type",
        description: "Determines what keyboard is given to the user.",
        editable: true,
        required: false,
        defaultValue: null,
        options: [
          "default",
          "email-address",
          "numeric",
          "phone-pad",
          "ascii-capable",
          "numbers-and-punctuation",
          "url",
          "number-pad",
          "name-phone-pad",
          "decimal-pad",
          "twitter",
          "web-search",
          "visible-password",
        ],
        formType: FORM_TYPES.flatArray,
        propType: PROP_TYPES.STRING,
      },
      maxLength: {
        group: GROUPS.basic,
        label: "Max Length",
        description: "Limits the input to a set number of characters.",
        editable: true,
        required: false,
        defaultValue: null,
        min: 0,
        step: 1,
        precision: 0,
        formType: FORM_TYPES.number,
        propType: PROP_TYPES.NUMBER,
      },
      placeholder: {
        group: GROUPS.data,
        label: "Placeholder Text",
        description:
          "The text that is shown on load when no value is available.",
        editable: true,
        required: false,
        defaultValue: "Enter a value...",
        formType: FORM_TYPES.string,
        propType: PROP_TYPES.STRING,
      },
      placeholderTextColor: {
        group: GROUPS.basic,
        label: "Placeholder Text Color",
        description: "The color of the placeholder text.",
        editable: true,
        required: false,
        defaultValue: null,
        formType: FORM_TYPES.color,
        propType: PROP_TYPES.STRING,
      },
      returnKeyLabel: {
        group: GROUPS.advanced,
        label: "Return Key Label",
        description:
          "(Android Only) Sets the label on the return key (use this instead of rewturnKeyType)",
        editable: true,
        required: false,
        defaultValue: null,
        formType: FORM_TYPES.string,
        propType: PROP_TYPES.STRING,
      },
      returnKeyType: {
        group: GROUPS.advanced,
        label: "Return Key Type",
        description: "Determines how the return key should look like",
        editable: true,
        required: false,
        defaultValue: null,
        options: [
          "done",
          "go",
          "next",
          "search",
          "send",
          "none",
          "previous",
          "default",
          "emergency-call",
          "google",
          "join",
          "route",
          "yahoo",
        ],
        formType: FORM_TYPES.flatArray,
        propType: PROP_TYPES.STRING,
      },
      secureTextEntry: {
        group: GROUPS.basic,
        label: "Password Input?",
        description:
          "Hides the characters with a *, useful for passwords and other sensitive information.",
        editable: true,
        required: false,
        defaultValue: null,
        formType: FORM_TYPES.boolean,
        propType: PROP_TYPES.BOOLEAN,
      },
      selectionColor: {
        group: GROUPS.advanced,
        label: "Selection Color",
        description: "Color of the highlighted portion when selecting.",
        editable: true,
        required: false,
        defaultValue: null,
        formType: FORM_TYPES.color,
        propType: PROP_TYPES.STRING,
      },
      selectTextOnFocus: {
        group: GROUPS.advanced,
        label: "Select Text on Focus",
        description:
          "If true, all the text will automatically be selected on focus",
        editable: true,
        required: false,
        defaultValue: null,
        formType: FORM_TYPES.boolean,
        propType: PROP_TYPES.BOOLEAN,
      },
      ...SEED_DATA_PROPS,
      multiline: {
        group: GROUPS.basic,
        label: "Multiple Lines",
        description:
          "Allows multiple lines of input, useful for situations where the user may be typing in a lot of data.",
        editable: true,
        required: false,
        defaultValue: null,
        formType: FORM_TYPES.boolean,
        propType: PROP_TYPES.BOOLEAN,
      },
      numberOfLines: {
        group: GROUPS.basic,
        label: "Number of Lines",
        description:
          "Sets the number of lines for the input (Multiple Lines needs to be true)",
        editable: true,
        required: false,
        defaultValue: null,
        min: 0,
        step: 1,
        precision: 0,
        formType: FORM_TYPES.number,
        propType: PROP_TYPES.NUMBER,
      },
      scrollEnabled: {
        group: GROUPS.basic,
        label: "Scroll Enabled",
        description:
          "If false, scrolling of the input will be disabled. Only works when Multiple Lines is true",
        editable: true,
        required: false,
        defaultValue: null,
        formType: FORM_TYPES.boolean,
        propType: PROP_TYPES.BOOLEAN,
      },
      spellcheck: {
        group: GROUPS.basic,
        label: "Disable Spell Check",
        description:
          "If false, disables spell-check style (red underlines). Default comes from Auto Correct",
        editable: true,
        required: false,
        defaultValue: null,
        formType: FORM_TYPES.boolean,
        propType: PROP_TYPES.BOOLEAN,
      },
      textContentType: {
        group: GROUPS.advanced,
        label: "Text Content Type",
        description:
          "Give the keyboard and system about what it should do with the input. For example, if its an address, autofill from address book",
        editable: true,
        required: false,
        defaultValue: null,
        options: [
          "none",
          "URL",
          "addressCity",
          "addressCityAndState",
          "addressState",
          "countryName",
          "creditCardNumber",
          "emailAddress",
          "familyName",
          "fullStreetAddress",
          "givenName",
          "jobTitle",
          "location",
          "middleName",
          "name",
          "namePrefix",
          "nameSuffix",
          "nickname",
          "organizationName",
          "postalCode",
          "streetAddressLine1",
          "streetAddressLine2",
          "sublocality",
          "telephoneNumber",
          "username",
          "password",
        ],
        formType: FORM_TYPES.flatArray,
        propType: PROP_TYPES.STRING,
      },
      textBreakStrategy: {
        group: GROUPS.advanced,
        label: "Text Break Strategy",
        description:
          "(Android Only) Set the text break strategy. (Default: simple)",
        editable: true,
        required: false,
        defaultValue: null,
        options: ["simple", "highQuality", "balanced"],
        formType: FORM_TYPES.flatArray,
        propType: PROP_TYPES.STRING,
      },
    },
  },
];
