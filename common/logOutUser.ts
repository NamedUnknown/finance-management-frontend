export function logoutUser() {
  sessionStorage.clear();
  window.location.reload();
}