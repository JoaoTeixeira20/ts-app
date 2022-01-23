import {
  fieldType,
  formConfig,
  formType,
} from '../configuration/configuration';

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

export const mergeDeepAll = (...objects: any) => {
  const isObject = (obj: any) => obj && typeof obj === 'object';

  return objects.reduce((prev: any, obj: any) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
};

export const getValueFromDotNotationIndex = (obj: any, index: string) => {
  return index.split('.').reduce((o, i) => o[i], obj);
};

export const buildDefaults = (form: formType, fieldKey: string): any => {
  const fields = {
    [form.id]: form.fields
      .map((field) => {
        const fieldParam = { [field.name]: field[fieldKey] || '' };
        const subForms =
          field.subForm && buildDefaults(field.subForm, fieldKey);
        return { ...fieldParam, ...subForms };
      })
      .reduce((prev, curr) => {
        return { ...curr, ...prev };
      }, {}),
  };

  return fields;
};

export const buildFormPath = (
  path: string,
  form: formType,
  fieldsToAdd: fieldType[]
): formType => {
  const splittedPath = path.split('.');
  const firstId = splittedPath.shift();
  const secondid = splittedPath.shift();

  return !secondid
    ? {
        id: firstId || 'YouMustHaveaRootPathParameter',
        fields: fieldsToAdd,
      }
    : {
        id: firstId || 'YouMustHaveaRootPathParameter',
        fields: form.fields.map((field) => {
          if (field.subForm?.id === secondid && field.subForm) {
            secondid && splittedPath.unshift(secondid);
            return {
              ...field,
              subForm: buildFormPath(
                splittedPath.join('.'),
                field.subForm,
                fieldsToAdd
              ),
            };
          } else {
            return field;
          }
        }),
      };

  // const result = form?.fields.find((field) => {
  //   return field.subForm?.id === secondid;
  // });

  // const restFields = form?.fields.filter((field) => {
  //   return field.subForm?.id !== secondid;
  // });

  // console.log('this are the restFields', restFields);

  // secondid && splittedPath.unshift(secondid);

  // const returnValue: formType | undefined =
  //   firstId && result && restFields
  //     ? {
  //         id: firstId,
  //         fields: [
  //           ...restFields,
  //           {
  //             ...result,
  //             subForm: buildFormPath(
  //               splittedPath.join('.'),
  //               result.subForm,
  //               fieldsToAdd
  //             ),
  //           },
  //         ],
  //       }
  //     : undefined;

  // return firstId && returnValue
  //   ? returnValue
  //   : { id: firstId || 'error', fields: fieldsToAdd };
};

// const formPath = 'mainform.selectoptions.option2form.tabsform.tabsform2';
const formPath = 'mainform.selectoptions';

const fieldsToAdd: fieldType[] = [
  {
    label: '1',
    name: '1',
    type: 'selectoption',
    value: '1',
  },
  {
    label: '2',
    name: '2',
    type: 'selectoption',
    value: '2',
  },
  {
    label: '3',
    name: '3',
    type: 'selectoption',
    value: '3',
  },
];

console.log(
  'res',
  JSON.stringify(buildFormPath(formPath, formConfig, fieldsToAdd), null, ' ')
);
