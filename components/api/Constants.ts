import { RequestParams } from "../../model/requestParams";

const SERVER_URL = "http://localhost:8080";

// ! Auth
const AUTH_URL = SERVER_URL + "/auth";

export const USER: 
  RequestParams = {
    apiUrl: AUTH_URL,
    method: "GET",
    credentials: "include"
  };

const AUTH_LOGIN_URL = AUTH_URL + "/login";

export const LOGIN = (headers: Map<string, Object>) => {
  return {
    apiUrl: AUTH_LOGIN_URL,
    method: "POST",
    headers: headers
  };
}

export const AUTH_REGISTER_URL = AUTH_URL + "/register";


// ! Finances
const FINANCES_URL = SERVER_URL + "/finances";

export const FINANCES_GET: 
  RequestParams = {
    apiUrl: FINANCES_URL,
    method: "GET",
    credentials: "include"
  };

export const FINANCES_POST = (body: Object) => {
  return {
    apiUrl: FINANCES_URL,
    method: "POST",
    credentials: "include",
    body: body
  };
}

export const FINANCES_PUT = (body: Object) => {
  return {
    apiUrl: FINANCES_URL,
    method: "PUT",
    credentials: "include",
    body: body
  };
}

export const FINANCES_DELETE = (id: number) => {
  return {
    apiUrl: FINANCES_URL,
    method: "DELETE",
    credentials: "include",
    body: id
  };
}

// ! Savings
const SAVINGS_URL = SERVER_URL + "/savings";

export const SAVINGS_GET: 
  RequestParams = {
    apiUrl: SAVINGS_URL,
    method: "GET",
    credentials: "include"
  };

export const SAVINGS_POST = (body: Object) => {
  return {
    apiUrl: SAVINGS_URL,
    method: "POST",
    credentials: "include",
    body: body
  };
}

export const SAVINGS_PUT = (body: Object) => {
  return {
    apiUrl: SAVINGS_URL,
    method: "PUT",
    credentials: "include",
    body: body
  };
}

export const SAVINGS_DELETE = (id: number) => {
  return {
    apiUrl: SAVINGS_URL,
    method: "DELETE",
    credentials: "include",
    body: id
  };
}

