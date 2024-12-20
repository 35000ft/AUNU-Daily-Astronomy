export function isDateGreaterThanToday(_date) {
  // 获取今天的日期（不带时间）
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 设置为当天的00:00:00，忽略时间部分

  // 将字符串转换为日期对象
  _date.setHours(0, 0, 0, 0); // 设置为日期的00:00:00，忽略时间部分

  // 比较日期
  return _date > today; // 如果目标日期大于今天，返回 true
}
