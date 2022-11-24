import { createElement, useEffect, useReducer, useState } from "react";
import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import {
  DefaultTheme,
  Provider,
  Row,
  ScreenContainer,
  Stack,
  Touchable,
} from "@draftbit/ui";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

// import test_json from "./_json_test.json";
import test_json from "./_json_screen_test.json";
import JsonGenerator from "./_actual_json_generator";
import MyEditor from "./_my_editor";

import http from "./_http";

// default component values
export const defaultComponents = {
  TextInput: {
    id: "TextInput",
    element: "TextInput",
    name: "text-input",
    defaultValue: "",
  },
  Text: {
    id: "Text",
    element: "Text",
    children: "Text",
  },
  View: {
    id: "View",
    element: "View",
  },
  Row: {
    id: "Row",
    element: "Row",
  },
  Stack: {
    id: "Stack",
    element: "Stack",
  },
};

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
  const [loading, setLoading] = useState(true);
  const [listItems, setListItems] = useState([]);
  const [currScreenIdx, setCurrScreenIdx] = useState(0);

  const [allScreens, updateScreens] = useReducer((state, action) => {
    switch (action.type) {
      case "all-screens":
        console.log({ payload: action.payload });
        return action.payload;
      case "update":
        console.log("updating!");
        console.log(state, "before");

        if (json) state[currScreenIdx] = json;
        console.log(state, "after");
        return state;
      default:
        return state;
    }
  }, test_json);

  console.log({ allScreens });

  const [json, updateJson] = useReducer((state, action) => {
    let payload;
    switch (action.type) {
      case "screen":
        console.log({ allScreens, currScreenIdx });
        return allScreens[currScreenIdx];
      case "update":
        payload = action.payload;
        return JSON.parse(JSON.stringify(payload));

      default:
        return {};
    }
  }, test_json);

  /**
   * Finds element. Updates element/json if requested.
   * @param {string} id Id of the element
   * @param {onFindCb | boolean} onFindCb Callback for what to do when element found
   * @param {Object} opts Contains extra flags like updateJson, setCurrent
   * setCurrent: Set the element as the currently-editing element
   * updateJson: Update the whole JSON
   * @returns {Object | undefined} Returns the found element
   */
  const searchElement = (
    id,
    onFindCb = false,
    opts = {
      updateJson: true,
      setCurrent: true,
    }
  ) => {
    const stack = [[json, null]];
    let foundElem;
    while (stack.length) {
      let [curr, parent] = stack.pop();
      // check for match on type
      if (curr.id === id) {
        if (onFindCb) {
          curr = Object.assign(curr, onFindCb(curr)); // apply changes
        }
        opts.setCurrent && setCurrent(curr);
        foundElem = curr;
      }
      curr.children &&
        typeof curr.children !== "string" &&
        curr.children.forEach((child) => stack.push([child, curr]));
    }
    opts.updateJson && updateJson({ type: "update", payload: json });
    return foundElem;
  };

  // Just find and return the element.
  const findElement = (id) => searchElement(id);

  /** Find and update an element. For styles, use updateStyles instead.
   * @param {string} id of element
   * @param {Object} updates object with key-value pairs of element props to be applied
   * @returns {Object | undefined} Returns the found element
   */
  const updateElement = (id, updates = {}) =>
    searchElement(id, (el) => ({ ...el, ...updates }));

  // Find and update an element's styles
  const updateStyles = (id, newStyles = {}) =>
    searchElement(id, (el) => ({
      ...el,
      styles: { ...el.styles, ...newStyles },
    }));

  const stylesMap = (styles) => {
    return styles;
    // const mappedStyles = {};
    // styles.forEach(style => mappedStyles[style.name] = style.value)
    // return mappedStyles;
  };

  const renderComponent = (elConfig) => {
    const { id, element, defaultValue, styles, children, className, ...props } =
      elConfig;
    if (typeof keysToComponentMap[element] === "undefined") {
      console.error(`component ${element} does not exist`);
      return null;
    }

    const elementProps = {
      ...props,
      id: id,
      key: id,
      className: className || null,
      ...(defaultValue && { value: defaultValue }),
      ...(name && { name }),
      style: {
        ...(styles ? stylesMap(styles) : null),
        ...(id === current?.id && {
          outlineWidth: 2,
          outlineColor: "blue",
          outlineStyle: "inset",
        }),
      },
    };
    delete elementProps.defaultValue;
    // if (!elementProps.value && )

    return createElement(
      keysToComponentMap[element],
      elementProps,
      children &&
        (typeof children === "string"
          ? children
          : children.map((c) => renderComponent(c)))
    );
  };

  // save to db
  const writeJson = async () => {
    const res = await http.post("/test/post_template", {
      body: JSON.stringify(allScreens),
    });
  };

  const addElement = (parentId, elInfo) => {
    const stack = [[json, null]];
    while (stack.length) {
      let [curr, parent] = stack.pop();
      // check for match on type
      if (curr.id === parentId) {
        const newEl = { ...elInfo, id: `${elInfo} ${Date.now()}` };
        if (curr.children && Array.isArray(curr.children)) {
          curr.children.push(newEl);
        } else {
          curr.children = [newEl];
        }
        break;
      }
      curr.children &&
        typeof curr.children !== "string" &&
        curr.children.forEach((child) => stack.push([child, curr]));
    }
    updateJson({ type: "update", payload: json });
  };

  // fetch from db, set in state
  // On page load, topmost element should be selected.
  useEffect(() => {
    (async () => {
      const res = await http.get("/test/get_template");
      if (res && res.template_body) {
        const body = JSON.parse(res.template_body);
        console.log({ body });
        updateScreens({ type: "all-screens", payload: body });
        searchElement("InputScreen", false, { setCurrent: true }); // body.id is the top-most element's id.
      }

      // const resp = await http.get("/test/get_list");
      // if (resp) {
      //   console.log({ resp });
      //   setListItems(resp);
      // }

      setLoading(false);
    })();
  }, []);

  const loadFromJsonFile = () => {
    updateJson({ type: "update", payload: test_json[currScreenIdx] });
  };

  useEffect(() => {
    updateScreens({ type: "update" });
  }, [json]);

  useEffect(() => {
    updateJson({ type: "screen" });
  }, [currScreenIdx]);

  return (
    <Provider theme={DefaultTheme}>
      <SafeAreaProvider
        id="the-generator"
        initialMetrics={initialWindowMetrics}
        style={{ flexDirection: "column" }}
      >
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Row>
              {allScreens.map((screen, idx) => {
                return (
                  <Touchable
                    key={screen.id}
                    onPress={() => setCurrScreenIdx(idx)}
                  >
                    <Text>{screen.id}</Text>
                  </Touchable>
                );
              })}
            </Row>
            <ScreenContainer
              hasBottomSafeArea={true}
              hasSafeArea={true}
              hasTopSafeArea={true}
              scrollable={true}
              style={styles.screenContainer}
            >
              <JsonGenerator
                current={current}
                findElement={findElement}
                json={json}
                addElement={addElement}
              />
              <ScreenContainer
                hasBottomSafeArea={true}
                hasSafeArea={true}
                hasTopSafeArea={true}
                scrollable={true}
                style={styles.device}
              >
                {renderComponent(json)}
                <Touchable onPress={writeJson}>
                  <Text>Write to JSON</Text>
                </Touchable>
                <Touchable onPress={loadFromJsonFile}>
                  <Text>Load from JSON test file</Text>
                </Touchable>
              </ScreenContainer>
              <MyEditor
                elConfig={current}
                updateElement={updateElement}
                updateStyles={updateStyles}
              />
            </ScreenContainer>
          </>
        )}
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screenContainer: { flexDirection: "row" },
  device: {
    borderWidth: 1,
    height: 844,
    width: 390,
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: "center",
    margin: "auto",
  },
});
