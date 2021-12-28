export const strToObj = (str: string, val: string) => {
  let i,
    obj: any = {},
    strarr = str.split('.');
  let x = obj;
  for (i = 0; i < strarr.length - 1; i++) {
    x = x[strarr[i]] = {};
  }
  x[strarr[i]] = val;
  return obj;
};

const isObject = (item: any) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

export const mergeDeep = (target: any, ...sources: any): any => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
};

export const getValueFromDotNotationIndex = (obj: any, index: string) => {
  return index.split('.').reduce((o, i) => o[i], obj);
};