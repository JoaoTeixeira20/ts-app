import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { formConfig } from '../configuration/configuration';
import {
  getValueFromDotNotationIndex,
  mergeDeep,
  strToObj,
  buildDefaults,
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
  const [validations, setValidations] = useState<{ [k: string]: any }>({});

  const mergeValues = (valueToMerge: {}) => {
    const result = mergeDeep(values, valueToMerge);
    setValues(result);
  };

  const mergeValidations = (validationsToMerge: {}) => {
    const result = mergeDeep(validations, validationsToMerge);
    setValidations(result);
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

  useEffect(() => {
    setValues(buildDefaults(formConfig));
  }, []);

  const value = { values, getValueFromPath, setValueOnPath };

  return (
    <FormValuesContext.Provider value={value}>
      {props.children}
    </FormValuesContext.Provider>
  );
};

export { FormValuesContextProvider, FormValuesContext };
