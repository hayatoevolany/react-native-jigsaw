import { createElement, useEffect, useReducer, useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import {
  DefaultTheme,
  Provider,
  Row,
  ScreenContainer,
  Stack,
} from "@draftbit/ui";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import test_json from "./_json_test.json";
import JsonGenerator from "./_actual_json_generator";
import MyEditor from "./_my_editor";

export default function Generator() {
  const keysToComponentMap = {
    TextInput: TextInput,
    Text: Text,
    ScreenContainer: ScreenContainer,
    Image: Image,
    View: View,
    Row: Row,
    Stack: Stack,
  };

  const [current, setCurrent] = useState(json);

  const [json, updateJson] = useReducer((state, action) => {
    const payload = action.payload;
    return JSON.parse(JSON.stringify(payload));
  }, test_json);

  const findElById = (id) => {
    const stack = [[json, null]];
    let foobar;
    while (stack.length) {
      const [curr, parent] = stack.pop();
      // check for match on type
      if (curr.id === id) {
        foobar = curr;
      }
      curr.children &&
        typeof curr.children !== "string" &&
        curr.children.forEach((child) => stack.push([child, curr]));
    }
    return foobar;
  };

  const dfsUpdateStyles = (id, updates = {}) => {
    const stack = [[json, null]];
    let foobar;
    while (stack.length) {
      const [curr, parent] = stack.pop();
      // check for match on type
      if (curr.id === id) {
        curr.styles = { ...curr.styles, ...updates };
        foobar = curr;
      }
      curr.children &&
        typeof curr.children !== "string" &&
        curr.children.forEach((child) => stack.push([child, curr]));
    }
    updateJson({ payload: json });
    foobar && setCurrent(foobar);
  };

  useEffect(() => {
    dfsUpdateStyles("InputScreen");
  }, []);

  const stylesMap = (styles) => {
    return styles;
    // const mappedStyles = {};
    // styles.forEach(style => mappedStyles[style.name] = style.value)
    // return mappedStyles;
  };

  const renderComponent = (elConfig) => {
    const { id, element, styles, children, className, ...props } = elConfig;
    if (typeof keysToComponentMap[element] === "undefined") {
      console.error(`component ${element} does not exist`);
      return null;
    }

    return createElement(
      keysToComponentMap[element],
      {
        ...props,
        id: id,
        key: id,
        className: className || null,
        style: {
          ...(styles ? stylesMap(styles) : null),
          ...(id === current?.id && {
            outlineWidth: 2,
            outlineColor: "blue",
            outlineStyle: "inset",
          }),
        },
      },
      children &&
        (typeof children === "string"
          ? children
          : children.map((c) => renderComponent(c)))
    );
  };

  return (
    <Provider theme={DefaultTheme}>
      <SafeAreaProvider
        initialMetrics={initialWindowMetrics}
        style={{ flexDirection: "row" }}
        id="the-generator"
      >
        <JsonGenerator
          findElById={findElById}
          json={json}
          current={current}
          setCurrent={setCurrent}
        />
        {renderComponent(json)}
        <MyEditor
          jsons={json}
          elConfig={current}
          updateConfig={setCurrent}
          updateStyles={dfsUpdateStyles}
        />
      </SafeAreaProvider>
    </Provider>
  );
}
