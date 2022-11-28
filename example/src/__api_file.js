import * as React from "react";
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from "react-query";
import { useIsFocused } from "@react-navigation/native";
import usePrevious from "../utils/usePrevious";
// import * as GlobalVariables from '../config/GlobalVariableContext';

export const recipesGET = (Constants) =>
  fetch(`https://anybot.me/api/service/recipes`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .catch(() => {});

export const useRecipesGET = (args, { refetchInterval } = {}) => {
  // const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(["recipe", args], () => recipesGET({}, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(["recipe"]),
  });
};

export const FetchRecipesGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  // const Constants = GlobalVariables.useValues();
  // const isFocused = useIsFocused();
  // const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useRecipesGET(
    {},
    { refetchInterval }
  );

  // React.useEffect(() => {
  //   if (!prevIsFocused && isFocused) {
  //     refetch();
  //   }
  // }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error("Fetch error: " + error.status + " " + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchRecipes: refetch });
};
