import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { formConfig, formType } from '../configuration/configuration';
import {
  getValueFromDotNotationIndex,
  mergeDeep,
  strToObj,
  buildDefaults,
} from '../helpers/utils';

interface IFormContext {
  values: {};
  formConfig: formType;
  // mergeValues: (valueToMerge: {}) => void;
  getValueFromPath: (basePath: string | undefined, fieldName: string) => string;
  setValueOnPath: (
    basePath: string | undefined,
    fieldname: string,
    value: string
  ) => void;
}

type FormValuesContextProps = {
  formConfig: formType;
};

const FormValuesContext = createContext({} as IFormContext);

const FormValuesContextProvider = (
  props: PropsWithChildren<FormValuesContextProps>
) => {
  const [values, setValues] = useState<{ [k: string]: any }>(
    buildDefaults(props.formConfig)
  );
  const [validations, setValidations] = useState<{ [k: string]: any }>({});

  const formConfig = props.formConfig;

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
    } catch (e: any) {
      console.log('problem with value initialization, desc:', e.message);
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

  const value = { values, formConfig, getValueFromPath, setValueOnPath };

  return (
    <FormValuesContext.Provider value={value}>
      {props.children}
    </FormValuesContext.Provider>
  );
};

export { FormValuesContextProvider, FormValuesContext };
