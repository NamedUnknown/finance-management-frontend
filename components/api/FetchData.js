import { getCookie } from "cookies-next";

export async function fetchDataFromAPI(apiUrl, headers, body, method, credentials) {
  let headerCredentials = {};
  if (credentials) {
    const jwt = sessionStorage.getItem("jwt");
    if (method == "GET") {
      headerCredentials = {
        "Authorization": "Bearer " + jwt,
        "Content-Type": "application/json",
      };
    } else {
      const csrf = getCookie("XSRF-TOKEN");
      //const csrf = sessionStorage.getItem("XSRF-TOKEN");
      headerCredentials = {
        "Authorization": "Bearer " + jwt,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "X-XSRF-TOKEN": csrf
      };
    }
  }

  const data = {
    headers: {
      ...headers,
      ...headerCredentials
    },
    body: body,
    method: method,
  };

  if (credentials) {
    data["credentials"] = credentials;
  }

  try {
    const response = await fetch(apiUrl, data);

    try {
      const parsedBody = await response.json();
      return {
        status: response.status,
        headers: response.headers,
        body: parsedBody
      };
    } catch (e) {
      return {
        status: response.status,
        headers: response.headers,
      };
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}