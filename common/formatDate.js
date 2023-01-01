export function formatDateToJS(dateString) {
  // yyyy-MM-dd
  const nums = dateString.split("-");
  const date = new Date();
  date.setFullYear(nums[0], nums[1] - 1, nums[2]);
  return date;
}

export function formatDateToJava(dateString) {
  const date = new Date(dateString);
  return date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
}

export function formatDateHTMLStyle(dateString) {
  return formatDateToJava(dateString)
}