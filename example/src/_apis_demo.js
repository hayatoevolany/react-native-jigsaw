import * as React from "react";
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from "react-query";
import { useIsFocused } from "@react-navigation/native";
import * as GlobalVariables from "../config/GlobalVariableContext";
import { useRef, useEffect } from "react";

// Hook (https://usehooks.com/usePrevious/)
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

// I only need to do the list view here. What if we did that?
// But it should also account for otehr ones too. make a post and update.
//

// Here is our get:
// We can modify it. By a little bit i think!
// but the general idea will be the same.

const foobar = {
  api: "https://anybot.me/api/service/recipes/",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  queryKey: "recipe",
  method: "GET",
  apiName: "recipes",
  element: "Fetch",
};

console.log(JSON.stringify(foobar));

// what are the constants for?
// the fetch function will basically be made by you.
export const recipeSingleGET = (Constants) =>
  // make a call to the api. we need to be able to pass in our header options here, so you need to include header options
  // in the generator.
  fetch(`https://anybot.me/api/service/recipes/`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "mode": "no-cors", // this was added by me. You'll need to add options adding here.
    },
  })
    // How do we process our request?
    .then((res) => {
      // will we receive an ok from all our apis? I'm guessing that this is the default value.
      if (!res.ok) {
        console.error("Fetch error: " + res.status + " " + res.statusText);
      }
      // return here and then decode the json.
      return res;
    })
    // decode json
    .then((res) => res.json())
    // include catch?
    .catch(() => {});

// this wraps the useQuery fn.
// what do we have args here for? what should get passed in?
export const useRecipeSingleGET = (args, { refetchInterval } = {}) => {
  // will we need the constants? We don't have it set up currently.
  // I think we can get rid of it. But when would be use it? Probably use it for the authentication values eh.
  const Constants = GlobalVariables.useValues(); // it must be used for the JWT. We'll probably need to implement the same thing.
  // an entire query client for our recipes api.
  // we can use it to invalidate any requests.
  const queryClient = useQueryClient();
  return useQuery(["recipe", args], () => recipeSingleGET(Constants, args), {
    refetchInterval,
    // i think this is a mistake no? Why would it be invalidating recipes? We don't have a recipes key in this app.
    onSuccess: () => queryClient.invalidateQueries(["recipes"]),
  });
};

// This is the actual fetch recipes function.
// It'll enclose the other components. That's what
export const FetchRecipeSingleGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  // would pass the constants into the fetch function.
  const Constants = GlobalVariables.useValues();
  // isfocused and previsfocused used for refetching data when page is loaded.
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  // Get the data.
  const { loading, data, error, refetch } = useRecipeSingleGET(
    {},
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error("Fetch error: " + error.status + " " + error.statusText);
      console.error(error);
    }
  }, [error]);

  // is there a better way to do this to data?
  // will we be changing data's shape at all?
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  // So the children has to be a function right? The function encloses the rest of the stuff.
  // Crazy... how we actually will be just having to write this stuff our manually right?
  // i'll basically have to have a template which we can use.
  // custom will be fucking hard though.
  return children({ loading, data, error, refetchRecipeSingle: refetch });
};
