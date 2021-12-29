import { createContext, PropsWithChildren, useState } from 'react';
import {
  getValueFromDotNotationIndex,
  mergeDeep,
  strToObj,
} from '../helpers/utils';

interface IFormContext {
  values: {};
  // mergeValues: (valueToMerge: {}) => void;
  getValueFromPath: (basePath: string | undefined, fieldName: string) => string;
  setValueOnPath: (
    basePath: string | undefined,
    fieldname: string,
    value: string
  ) => void;
}

type FormValuesContextProps = {};

const FormValuesContext = createContext({} as IFormContext);

const FormValuesContextProvider = (
  props: PropsWithChildren<FormValuesContextProps>
) => {
  const [values, setValues] = useState<{ [k: string]: any }>({});

  const mergeValues = (valueToMerge: {}) => {
    const result = mergeDeep(values, valueToMerge);
    setValues(result);
  };

  const getValueFromPath = (
    basePath: string | undefined,
    fieldName: string
  ): string => {
    const fieldPath = `${basePath}.${fieldName}`;
    try {
      return getValueFromDotNotationIndex(values, fieldPath);
    } catch (e) {
      mergeValues(strToObj(fieldPath, ''));
      return '';
    }
  };

  const setValueOnPath = (
    basePath: string | undefined,
    fieldname: string,
    value: string
  ): void => {
    mergeValues(strToObj(`${basePath}.${fieldname}`, value));
  };

  const value = { values, getValueFromPath, setValueOnPath };

  return (
    <FormValuesContext.Provider value={value}>
      {props.children}
    </FormValuesContext.Provider>
  );
};

export { FormValuesContextProvider, FormValuesContext };
