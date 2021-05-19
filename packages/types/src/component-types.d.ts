export declare const PROP_TYPES: {
    STRING: string;
    ARRAY: string;
    NUMBER: string;
    BOOLEAN: string;
    OBJECT: string;
    ASSET: string;
    THEME: string;
};
export declare const PLATFORMS: {
    ios: string;
    android: string;
    web: string;
};
export declare const GROUPS: {
    accessibility: string;
    basic: string;
    layout: string;
    advanced: string;
    data: string;
    uncategorized: string;
    action: string;
};
export declare const FORM_TYPES: {
    json: string;
    multiselect: string;
    position: string;
    sourceUrl: string;
    url: string;
    string: string;
    boolean: string;
    number: string;
    select: string;
    color: string;
    typeStyle: string;
    component: string;
    geolocation: string;
    image: string;
    imageArray: string;
    icon: string;
    style: string;
    function: string;
    flatArray: string;
    array: string;
    aspectRatio: string;
    date: string;
    borderRadiusMode: string;
    fieldName: string;
    action: string;
};
export declare const COMPONENT_TYPES: {
    basic: string;
    media: string;
    layout: string;
    input: string;
    data: string;
    card: string;
    header: string;
    button: string;
    image: string;
    field: string;
    formControl: string;
    row: string;
    container: string;
    blocks: string;
    deprecated: string;
    screen: string;
    codeComponent: string;
};
export declare const createElevationType: (defaultValue: any) => {
    defaultValue: any;
    label: string;
    description: string;
    formType: string;
    propType: string;
    options: number[];
    editable: boolean;
    required: boolean;
    group: string;
};
export declare const createTextProp: (overrides: any) => any;
export declare const createImageProp: (overrides?: {}) => {
    label: string;
    description: string;
    group: string;
    formType: string;
    propType: string;
    defaultValue: string;
    editable: boolean;
    required: boolean;
};
export declare const createSourceProp: (overrides?: {}) => {
    label: string;
    description: string;
    defaultValue: string;
    group: string;
    formType: string;
    propType: string;
    editable: boolean;
    required: boolean;
};
export declare const createResizeModeProp: (overrides?: {}) => {
    group: string;
    label: string;
    description: string;
    editable: boolean;
    required: boolean;
    defaultValue: string;
    formType: string;
    propType: string;
    options: string[];
};
export declare const createHitslopProp: (overrides?: {}) => {
    label: string;
    description: string;
    group: string;
    editable: boolean;
    required: boolean;
    formType: string;
    propType: string;
    defaultValue: null;
};
export declare const createIconProp: (overrides?: {}) => {
    label: string;
    description: string;
    formType: string;
    propType: string;
    defaultValue: string;
    required: boolean;
    editable: boolean;
    group: string;
};
export declare const createAspectRatioProp: (overrides?: {}) => {
    label: string;
    description: string;
    formType: string;
    propType: string;
    defaultValue: number;
    editable: boolean;
    required: boolean;
    group: string;
};
export declare const createActionProp: (overrides?: {}) => {
    label: string;
    description: string;
    group: string;
    formType: string;
    propType: string;
    defaultValue: null;
    editable: boolean;
    required: boolean;
};
export declare const createBoolProp: (overrides?: {}) => {
    label: string;
    description: string;
    formType: string;
    propType: string;
    defaultValue: boolean;
    editable: boolean;
    required: boolean;
    group: string;
};
export declare const createTextStyle: (overrides?: {}) => {
    group: string;
    label: string;
    description: string;
    editable: boolean;
    required: boolean;
    formType: string;
    propType: string;
    defaultValue: null;
};
export declare const createNumberProp: (overrides?: {}) => {
    label: string;
    description: string;
    formType: string;
    propType: string;
    group: string;
    defaultValue: null;
    editable: boolean;
    required: boolean;
    min: number;
    step: number;
};
export declare const createNumColumnsType: (overrides?: {}) => {
    label: string;
    description: string;
    group: string;
    formType: string;
    propType: string;
    defaultValue: number;
    editable: boolean;
    required: boolean;
};
export declare const createColorProp: (overrides?: {}) => {
    group: string;
    label: string;
    description: string;
    editable: boolean;
    required: boolean;
    defaultValue: null;
    formType: string;
    propType: string;
};
export declare const createIconSizeProp: (overrides?: {}) => {
    group: string;
    label: string;
    description: string;
    editable: boolean;
    required: boolean;
    formType: string;
    propType: string;
    defaultValue: number;
    options: number[];
};
export declare const createFieldNameProp: (overrides?: {}) => {
    handlerPropName: string;
    group: string;
    label: string;
    description: string;
    formType: string;
    propType: string;
    defaultValue: null;
    valuePropName: string;
    editable: boolean;
    required: boolean;
};
export declare const BORDER_RADIUS_MODE: {
    label: string;
    description: string;
    formType: string;
    propType: string;
    defaultValue: null;
    editable: boolean;
    required: boolean;
};
export declare const FIELD_NAME: {
    group: string;
    label: string;
    description: string;
    formType: string;
    propType: string;
    defaultValue: null;
    valuePropName: string;
    handlerPropName: string;
    editable: boolean;
    required: boolean;
};
export declare const createStateValue: (overrides?: {}) => {
    group: string;
    label: string;
    description: string;
    formType: string;
    propType: string;
    defaultValue: null;
    valuePropName: string;
    handlerPropName: string;
    editable: boolean;
    required: boolean;
};
export declare const TEXT_INPUT_PROPS: {
    allowFontScaling: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        formType: string;
        propType: string;
    };
    autoCapitalize: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        options: string[];
        formType: string;
        propType: string;
    };
    autoCorrect: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        formType: string;
        propType: string;
    };
    autoFocus: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        formType: string;
        propType: string;
    };
    caretHidden: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        formType: string;
        propType: string;
    };
    contextMenuHidden: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        formType: string;
        propType: string;
    };
    defaultValue: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        formType: string;
        propType: string;
    };
    editable: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        formType: string;
        propType: string;
    };
    keyboardAppearance: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        options: string[];
        formType: string;
        propType: string;
    };
    keyboardType: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        options: string[];
        formType: string;
        propType: string;
    };
    maxLength: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        min: number;
        step: number;
        precision: number;
        formType: string;
        propType: string;
    };
    placeholder: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: string;
        formType: string;
        propType: string;
    };
    placeholderTextColor: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        formType: string;
        propType: string;
    };
    returnKeyLabel: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        formType: string;
        propType: string;
    };
    returnKeyType: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        options: string[];
        formType: string;
        propType: string;
    };
    secureTextEntry: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        formType: string;
        propType: string;
    };
    selectionColor: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        formType: string;
        propType: string;
    };
    selectTextOnFocus: {
        group: string;
        label: string;
        description: string;
        editable: boolean;
        required: boolean;
        defaultValue: null;
        formType: string;
        propType: string;
    };
};
