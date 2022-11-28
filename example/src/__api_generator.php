<?php

function generate_api_GET($props)
{
    $headers = $props->headers;
    $foos = $props->foos;
    $apiName = $props->apiName;
    $method = $props->method;
    $api = $props->api;
    $queryKey = $props->queryKey;

    $headerStr = '';
    foreach ($headers as $key => $value) {
        $headerStr .= "\"${key}\": \"${value}\",";
    }
    
    $fetch1_name = $apiName . strtoupper($method);
    $fetch1 = <<<EOD
export const $fetch1_name = Constants =>
  fetch(`$api`, {
    headers: {
        $headerStr
    },
  })
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});


EOD;

    $fetch2_name = 'use' . ucfirst($apiName) . strtoupper($method);
    $fetch2 = <<<EOD
export const $fetch2_name = (args, { refetchInterval } = {}) => {
    const Constants = GlobalVariables.useValues();
    const queryClient = useQueryClient();
    return useQuery(['$queryKey', args], () => $fetch1_name(Constants, args), {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['$queryKey']),
    });
  };


EOD;

    $fetch3_name = 'Fetch' . ucfirst($apiName) . strtoupper($method);
    $fetch3_refetch_name = 'refetch' . ucfirst($apiName);
    $fetch3 = <<<EOD
export const $fetch3_name = ({
    children,
    onData = () => {},
    refetchInterval,
  }) => {
    const Constants = GlobalVariables.useValues();
    // const isFocused = useIsFocused();
    // const prevIsFocused = usePrevious(isFocused);
  
    const { loading, data, error, refetch } = $fetch2_name(
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
        console.error('Fetch error: ' + error.status + ' ' + error.statusText);
        console.error(error);
      }
    }, [error]);
    React.useEffect(() => {
      if (data) {
        onData(data);
      }
    }, [data]);
  
    return children({ loading, data, error, $fetch3_refetch_name: refetch });
  };

EOD;


    $api_file_string =  <<<EOD
import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import { useIsFocused } from '@react-navigation/native';
import usePrevious from '../utils/usePrevious';
import * as GlobalVariables from '../config/GlobalVariableContext';

$fetch1

$fetch2

$fetch3
EOD;

    return $api_file_string;
}
