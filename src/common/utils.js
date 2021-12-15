//防抖【func要执行的函数，delay需要等待的时间】
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if(timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }
};
