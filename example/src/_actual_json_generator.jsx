import { Icon, ScreenContainer, Touchable } from "@draftbit/ui";
import { Text, View } from "react-native";

const black = '#0E1217'

const componentIconMap = {
  TextInput: "text-fields",
  Text: "font-download",
  ScreenContainer: "tv",
  Image: "image",
  View: "list-alt",
  Row: "list-alt",
  Stack: "list-alt",
};

const JsonGenerator = ({ findElById, json, current, setCurrent }) => {
  // if (!json) return null;

  const renderEditor = (elConfig, level = 0) => {
    if (!elConfig) return null;

    const { id, element, styles, children, className, ...props } = elConfig;

    return (
      <View key={id}>
        <Touchable
          onPress={() => {
            setCurrent(() => findElById(id));
          }}
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
            color={current?.id === id ? black : 'white'}
            style={{ marginRight: 10 }}
            size={35}
            name={componentIconMap[element]}
          />
          <Text
            style={{
              color: current?.id === id ? black : 'white'
            }}
          >
            {element}
          </Text>
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
    </ScreenContainer>
  );
};

export default JsonGenerator;
