import * as React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Icon from "./Icon";
import Config from "./Config";
import { withTheme } from "../core/theming";
import theme from "../styles/DefaultTheme";

interface Props {
  maxStars?: number;
  rating?: number;
  theme: typeof theme;
  style?: StyleProp<ViewStyle>;
}

const StarRating: React.FC<Props> = ({
  maxStars = 5,
  rating = 0,
  theme: { colors },
  style,
}) => {
  const ratingRounded = Math.round(rating * 2) / 2;

  return (
    <View style={[styles.containerStyle, style]}>
      {[...Array(maxStars)].map((_, i) => (
        <Icon
          key={i}
          name={
            ratingRounded - i === 0.5
              ? "MaterialIcons/star-half"
              : "MaterialIcons/star"
          }
          size={Config.ratingStarSize}
          color={ratingRounded > i ? colors.primary : colors.divider}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default withTheme(StarRating);
