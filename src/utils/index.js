/**
 * 格式化日期
 * @param {Date|String|Number} date 日期对象/日期字符串/时间戳
 * @param {String} format 格式化模式，默认：YYYY-MM-DD HH:mm:ss
 * @returns {String} 格式化后的日期字符串
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return '';

  date = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

  const formatObj = {
    YYYY: date.getFullYear(),
    MM: (date.getMonth() + 1).toString().padStart(2, '0'),
    DD: date.getDate().toString().padStart(2, '0'),
    HH: date.getHours().toString().padStart(2, '0'),
    mm: date.getMinutes().toString().padStart(2, '0'),
    ss: date.getSeconds().toString().padStart(2, '0')
  };

  return format.replace(/(YYYY|MM|DD|HH|mm|ss)/g, match => formatObj[match]);
}

/**
 * 深拷贝对象
 * @param {Object} obj 要拷贝的对象
 * @returns {Object} 拷贝后的新对象
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;

  const clone = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}

/**
 * 防抖函数
 * @param {Function} fn 要执行的函数
 * @param {Number} delay 延迟时间，单位毫秒
 * @returns {Function} 防抖后的函数
 */
export function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 节流函数
 * @param {Function} fn 要执行的函数
 * @param {Number} interval 间隔时间，单位毫秒
 * @returns {Function} 节流后的函数
 */
export function throttle(fn, interval = 300) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
} 