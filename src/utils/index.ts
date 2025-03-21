export const getItem = <T>(key: string): T | null => {
  let value = null;
  try {
    const result = window.localStorage.getItem(key);
    if (result !== null && result !== 'undefined') {
      value = JSON.parse(result);
    }
  } catch (error) {
    console.error(error);
  }
  return value;
};

export const getStringItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const setItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

export const clearItems = () => {
  localStorage.clear();
};

/**
 * 获取URL参数对象
 * @returns {Record<string, string>}
 */
export const getURLSearchParamsObject = (): Record<string, string> => {
  const search = window.location.search?.substring(1) || '';
  try {
    return search.split('&').reduce((o, t) => {
      const [key, value] = t.split('=');
      o[key] = value;
      return o;
    }, {});
  } catch (err) {
    console.error(err);
    return {};
  }
};

/**
 * 格式化对象值类型
 * @param obj 对象
 * @param objPattern 对象key值类型申明
 * @returns {Record<string, any>}
 */
export const getObjectValueType = (
  obj: Record<string, any>,
  objPattern: Record<string, 'string' | 'number' | 'boolean'>,
): Record<string, any> => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    for (const key in obj) {
      switch (objPattern[key]) {
        case 'string':
          obj[key] = String(obj[key]);
          break;
        case 'number':
          obj[key] = Number(obj[key]);
          break;
        case 'boolean':
          obj[key] = Boolean(obj[key]);
          break;
      }
    }
  }

  return obj;
};
