import {
  ScreenContainer,
  IconButton,
  NumberInput,
  Stack,
  Row,
  Touchable,
} from "@draftbit/ui";
import { Text, View, StyleSheet, TextInput } from "react-native";
const _ = require("lodash");

const InputField = ({ elConfig, field, updateStyles }) => {
  const val = elConfig.styles?.[field] || 0;

  return (
    <Row style={styles.inputField}>
      <Text style={styles.inputFieldTitle}>{field}</Text>
      <IconButton
        size={24}
        color="white"
        icon="remove"
        onPress={() => updateStyles(elConfig.id, { [field]: val - 1 })}
        style={[styles.inputFieldButton]}
      />
      <NumberInput
        style={styles.inputFieldNumber}
        value={val}
        onChangeText={(num) => updateStyles(elConfig.id, { [field]: num })}
      />
      <IconButton
        size={24}
        color="white"
        icon="add"
        onPress={() => updateStyles(elConfig.id, { [field]: val + 1 })}
        style={[styles.inputFieldButton]}
      />
    </Row>
  );
};

const MyEditor = ({ elConfig, updateStyles, updateElement }) => {
  if (!elConfig) return null;

  return (
    <ScreenContainer
      hasSafeArea={true}
      hasTopSafeArea={true}
      hasBottomSafebArea={true}
      scrollable={false}
      style={styles.myEditor}
    >
      <Text style={styles.header}>{elConfig.id}</Text>
      <InputField
        elConfig={elConfig}
        updateStyles={updateStyles}
        field="paddingVertical"
      />
      <InputField
        elConfig={elConfig}
        updateStyles={updateStyles}
        field="paddingHorizontal"
      />
      <InputField
        elConfig={elConfig}
        updateStyles={updateStyles}
        field="marginLeft"
      />
      <InputField
        elConfig={elConfig}
        updateStyles={updateStyles}
        field="borderWidth"
      />
      <InputField
        elConfig={elConfig}
        updateStyles={updateStyles}
        field="marginBottom"
      />
      {["Row", "Stack", "View"].includes(elConfig.element) && (
        <>
          <Touchable
            onPress={() => updateElement(elConfig.id, { element: "Row" })}
          >
            <Text style={{ color: "white" }}>Row</Text>
          </Touchable>
          <Touchable
            onPress={() => updateElement(elConfig.id, { element: "Stack" })}
          >
            <Text style={{ color: "white" }}>Stack</Text>
          </Touchable>
        </>
      )}
      {["TextInput"].includes(elConfig.element) && (
        <Row style={styles.inputField}>
          <Text style={styles.inputFieldTitle}>
            {elConfig.name} default value
          </Text>
          <TextInput
            style={styles.inputFieldText}
            defaultValue={elConfig.defaultValue}
            onChangeText={(val) =>
              updateElement(elConfig.id, { defaultValue: val })
            }
          />
        </Row>
      )}

      {["Text"].includes(elConfig.element) && (
        <Row style={styles.inputField}>
          <Text style={styles.inputFieldTitle}>{elConfig.name} Text:</Text>
          <TextInput
            value={elConfig.children}
            style={styles.inputFieldText}
            onChangeText={(val) =>
              updateElement(elConfig.id, { children: val })
            }
          />
        </Row>
      )}
    </ScreenContainer>
  );
};

export default MyEditor;

const styles = StyleSheet.create({
  myEditor: {
    backgroundColor: "#0E1217",
    padding: 40,
  },
  header: {
    color: "white",
    alignSelf: "center",
    marginBottom: 40,
    fontSize: 24,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "white",
  },
  inputField: {
    height: 40,
    borderWidth: 1,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  inputFieldTitle: {
    color: "white",
    fontSize: 16,
    fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
    marginRight: 8,
    justifyContent: "center",
  },
  inputFieldNumber: {
    height: "calc(100% - 4px)",
    width: 40,
    textAlign: "center",
    color: "white",
    marginHorizontal: 3,
  },
  inputFieldButton: {
    borderWidth: 1,
    borderColor: "white",
    padding: 16,
    color: "white",
    borderRadius: 6,
  },
  inputFieldText: {
    color: "white",
    height: 40,
    fontSize: 16,
    paddingLeft: 8,
    borderRadius: 4,
    fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
    borderColor: "white",
    borderWidth: 1,
  },
});
