export function formatDateToJS(dateString: string): Date {
  // yyyy-MM-dd
  const nums: Array<string> = dateString.toString().split("-");
  const date = new Date();
  date.setFullYear(Number(nums[0]), Number(nums[1]) - 1, Number(nums[2]));
  return date;
}

export function formatDateToJava(date: Date): string {
  return date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
}

export function formatDateHTMLStyle(date: Date): string {
  return date.getFullYear() + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate()) + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1));
}