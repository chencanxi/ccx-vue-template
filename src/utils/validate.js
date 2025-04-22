/**
 * 检查是否为外部链接
 * @param {string} path 路径
 * @returns {boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:|\/\/)/.test(path);
}

/**
 * 验证URL
 * @param {string} url URL地址
 * @returns {boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * 验证邮箱
 * @param {string} email 邮箱地址
 * @returns {boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * 验证手机号
 * @param {string} phone 手机号
 * @returns {boolean}
 */
export function validPhone(phone) {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(phone);
}

/**
 * 验证密码强度
 * @param {string} password 密码
 * @returns {boolean} 是否符合要求（至少8位，包含大小写字母和数字）
 */
export function validPassword(password) {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return reg.test(password);
} 