import { ScreenContainer, View, Text, TextInput, Image } from "React";
import Fetch from "./App";

const foo = () => {
  return (
    <>
      <ScreenContainer
        id={"CoolScreen"}
        hasSafeArea={1}
        hasTopSafeArea={1}
        hasBottomSafeArea={1}
        scrollable={1}
      >
        <View id={"GreenView"}>
          <Text id={"Text"}>{"hello there"}</Text>
        </View>
        <TextInput
          id={"TextInput"}
          name={"text-input-1"}
          defaultValue={""}
        ></TextInput>
      </ScreenContainer>
      <ScreenContainer
        id={"InputScreen"}
        hasSafeArea={1}
        hasTopSafeArea={1}
        hasBottomSafeArea={1}
        scrollable={1}
      >
        <View id={"PinkView"}>
          <Image id={"Image1"} source={"https://picsum.photos/200/300"}></Image>
        </View>
        <View id={"BlueView"}>
          <Text id={"Text2"}>{"Goodbye there"}</Text>
        </View>
        <TextInput
          id={"TextInput2"}
          name={"text-input-2"}
          defaultValue={""}
        ></TextInput>
      </ScreenContainer>
      <View id={"GreenView"}>
        <Text id={"Text"}>{"hello there"}</Text>
      </View>
      <TextInput
        id={"TextInput"}
        name={"text-input-1"}
        defaultValue={""}
      ></TextInput>
    </>
  );
};
