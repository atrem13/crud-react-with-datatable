import axios from "axios";

export let apiHost =
  process.env.API_URI || "https://60cb2f6921337e0017e440a0.mockapi.io/";

export function url(suffix) {
  return apiHost + suffix;
}

export const api = (token) => {
  // const authToken = token;
  const instance = axios.create({
    baseURL: apiHost,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
      // Authorization: `Bearer ${authToken}`
    }
  });

  return instance;
};
