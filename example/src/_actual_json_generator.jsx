import {
  Icon,
  IconButton,
  Row,
  ScreenContainer,
  Stack,
  Touchable,
} from "@draftbit/ui";
import { useReducer } from "react";
import { useState } from "react";
import { Text, View, Modal, TextInput } from "react-native";
import { defaultComponents } from "./_json_generator";
const black = "#0E1217";

const componentIconMap = {
  TextInput: "text-fields",
  Text: "font-download",
  ScreenContainer: "tv",
  Image: "image",
  View: "list-alt",
  Row: "list-alt",
  Stack: "list-alt",
};

const JsonGenerator = ({ findElement, json, current, addElement }) => {
  // if (!json) return null;
  const [modalVisible, setModalVisible] = useState(false);
  const [parentId, setParentId] = useState();

  const reducer = (state, action) => {
    switch (action.type) {
      case "element":
        return defaultComponents[action.element];
      case "props":
        return { ...state, ...action.props };
      case "styles":
        return { ...state, styles: { ...state.styles, ...action.styles } };
      default:
        return state;
    }
  };
  const [elState, elDispatch] = useReducer(reducer, defaultComponents["View"]);

  const renderEditor = (elConfig, level = 0) => {
    if (!elConfig) return null;

    const { id, element, styles, children, className, ...props } = elConfig;

    return (
      <View key={id}>
        <Touchable
          onPress={() => findElement(id)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "white",
            paddingLeft: level * 20,
            backgroundColor: current?.id === id ? "white" : black,
          }}
        >
          <Icon
            color={current?.id === id ? black : "white"}
            style={{ marginRight: 10 }}
            size={35}
            name={componentIconMap[element]}
          />
          <Text
            style={{
              color: current?.id === id ? black : "white",
            }}
          >
            {element}
          </Text>
          {["View", "Row", "Stack"].includes(element) && (
            <IconButton
              size={24}
              color={current?.id === id ? black : "white"}
              icon="add"
              onPress={() => {
                setModalVisible(true);
                setParentId(id);
                // update the json
              }}
              style={{ marginLeft: "auto" }}
            />
          )}
        </Touchable>
        {children &&
          typeof children !== "string" &&
          children.map((c) => renderEditor(c, level + 1))}
      </View>
    );
  };

  return (
    <ScreenContainer
      hasSafeArea={true}
      hasTopSafeArea={true}
      hasBottomSafeArea={true}
      scrollable={false}
      style={{ backgroundColor: "#0E1217" }}
    >
      {renderEditor(json)}
      <Modal
        // animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Row>
              {["View", "Row", "Stack", "Text", "TextInput"].map((elem) => {
                return (
                  <Touchable
                    key={elem}
                    style={{ marginRight: 10 }}
                    onPress={() =>
                      elDispatch({ type: "element", element: elem })
                    }
                  >
                    <Text
                      style={{
                        color: elState.element === elem ? "red" : "black",
                      }}
                    >
                      {elem}
                    </Text>
                  </Touchable>
                );
              })}
            </Row>
            <Stack>
              {Object.entries(elState).map(([k, v]) => {
                if (["id", "element"].includes(k)) return null;

                let label = k;
                if (k === "children") label = "Label";
                return (
                  <Row key={k}>
                    <Text>{label}</Text>
                    <TextInput
                      style={{ marginLeft: 10, borderWidth: 1 }}
                      value={elState[k]}
                      onChangeText={(val) => {
                        elDispatch({ type: "props", props: { [k]: val } });
                      }}
                    />
                  </Row>
                );
              })}
            </Stack>

            <Touchable
              onPress={() => {
                addElement(parentId, elState);
                setModalVisible(false);
              }}
            >
              <Text>Create Element</Text>
            </Touchable>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default JsonGenerator;
