import { deleteCookie } from 'cookies-next';

export function logOutUser() {
  sessionStorage.clear();
  deleteCookie("XSRF-TOKEN");
  window.location.reload();
}