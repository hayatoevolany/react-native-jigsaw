import React from "react";
import { ActivityIndicator, Text } from "react-native";

const FetchDemo = (props) => {
  const Fetch = () => {};

  // need to be able to create these APIs.
  // I dont think its a good idea to just copy-paste their code. You'll probably get in trouble for that.
  // but how would they find out? I guess they'd have to go through our system to get the app code.

  // I need to have the API/Provider first.

  // <RecipeSingleApi.FetchRecipeSingleGET
  //   onData={(fetchData) => {
  //     try {
  //       const cool_recipe = fetchData["data"].find(
  //         (x) => x.id == (props.route?.params?.recipe_id ?? 2160)
  //       );
  //       const title = cool_recipe.title;
  //       const image = cool_recipe.image;
  //       const uri = cool_recipe.uri;
  //       const ingredients = cool_recipe.ingredients;
  //       setTitle(title);
  //       setImage(image);
  //       setIngredients(ingredients);
  //       setUri(uri);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }}
  // >
  //   {({ loading, error, data, refetchRecipeSingle }) => {
  //     const fetchData = data;
  //     if (!fetchData || loading) {
  //       return <ActivityIndicator />;
  //     }

  //     if (error) {
  //       return (
  //         <Text style={{ textAlign: "center" }}>
  //           There was a problem fetching this data
  //         </Text>
  //       );
  //     }

  //     return <></>;
  //   }}
  // </RecipeSingleApi.FetchRecipeSingleGET>;
};

export default FetchDemo;
