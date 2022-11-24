// import { getData, AUTH_TOKEN } from '../data/data';
// import { API_BASE, VERSION } from '@env';
// import { trimObject } from 'libs/utils';

const DEBUG = false;

const pruneObject = (obj) =>
  obj &&
  Object.fromEntries(Object.entries(obj).filter(([k, v]) => v !== void 0));
const transformRequest = (jsonData = {}) =>
  "?" +
  Object.entries(jsonData)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

const http = (api, method, body, headers, { noBase, json, noAuth } = {}) =>
  new Promise((resolve, reject) => {
    // console.log('REQUEST:', api, JSON.stringify(trimObject({...body, bid: undefined})));
    if (["UPLOAD"].includes(method)) {
      method = "POST";
    }

    body = pruneObject(body);
    // body._version = VERSION;

    if (json) {
      body = JSON.stringify(body);
    } else if (["GET", "DELETE", "PUT"].includes(method) || json) {
      api = body ? `${api}${transformRequest(body)}` : api;
      body = undefined;
    } else {
      // if(Platform.OS === 'android') {
      // 	// api += '&' + Object.entries(body).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
      // 	// body = undefined;
      // 	body = JSON.stringify(body || {});
      // 	headers = {
      // 		...headers,
      // 		'Content-Type': 'application/json;charset=utf-8',
      // 		// Accept: 'application/json',
      // 	}
      // } else {
      const formData = new FormData();
      Object.entries(body || {}).forEach(([key, value]) => {
        formData.append(key, value);
      });
      body = formData;
      // }
    }

    api =
      noBase || !api.startsWith("/") ? api : "http://anybot.test" + "/" + api;
    api = api.replace(/\/\/+/g, "/").replace(/:\/(?!\/)/g, "://");

    headers = {
      // ...(noAuth ? {} : { 'AUTH-TOKEN': getData(AUTH_TOKEN) }),
      ...headers,
    };
    DEBUG && console.log(">>>", method, api, { headers, body });

    fetch(api, {
      method,
      mode: "cors",
      headers,
      body,
    })
      .then((response) => {
        if (response.ok && response.status === 200) {
          response.text().then((text) => {
            try {
              const json = JSON.parse(text);
              DEBUG && console.log("<<<", json);
              resolve(json);
            } catch (ex) {
              if (!text?.trim()) {
                resolve();
                return;
              }
              resolve({
                result: "error",
                error_msg: response.statusText || response.status,
                reason: response.status,
              });
            }
          });
        } else {
          resolve({
            result: "error",
            error_msg: response.statusText || response.status,
            reason: response.status,
          });
        }
      })
      .catch((ex) => {
        resolve({
          result: "error",
          error_msg: ex.message,
          reason: ex.message,
        });
      });
  });

export const get = async (api, data, headers, config) => {
  const result = await http(api, "GET", data, headers, config);
  return result;
};

export const post = async (api, data, headers, config) => {
  const result = await http(api, "POST", data, headers, config);
  return result;
};

export const del = async (api, data, headers, config) => {
  const result = await http(api, "DELETE", data, headers, config);
  return result;
};

export const upload = async (api, data, headers, config) => {
  const result = await http(api, "UPLOAD", data, headers, config);
  return result;
};

export const put = async (api, data, headers, config) => {
  const result = await http(api, "PUT", data, headers, config);
  return result;
};

export default {
  get,
  post,
  del,
  upload,
  put,
};
