import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { formType } from '../configuration/configuration';
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
  const initialValues = () => {
    const initialState = buildDefaults(props.formConfig);
    try {
      const valuesFromStore = JSON.parse(window.electronAPI.getData());
      return mergeDeep(initialState, valuesFromStore);
    } catch (e: any) {
      console.log(
        'there was a problem loading values from store, desc:',
        e.message
      );
      return initialState;
    }
  };

  const [values, setValues] = useState<{ [k: string]: any }>(initialValues());
  const [validations, setValidations] = useState<{ [k: string]: any }>({});

  const formConfig = props.formConfig;

  const mergeValues = (valueToMerge: {}) => {
    const result = mergeDeep(values, valueToMerge);
    setStoreValues(result);
    setValues(result);
  };

  const getValueFromPath = (
    basePath: string | undefined,
    fieldName: string | undefined
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

  useEffect(() => {
    try {
      const valuesFromStore = JSON.parse(window.electronAPI.getData());
      mergeValues(valuesFromStore);
    } catch (e: any) {
      console.log(
        'there was a problem loading values from store, desc:',
        e.message
      );
    }
  }, []);

  const setStoreValues = (values: {}): void => {
    window.electronAPI.storeData(JSON.stringify(values));
  };

  return (
    <FormValuesContext.Provider value={value}>
      {props.children}
    </FormValuesContext.Provider>
  );
};

export { FormValuesContextProvider, FormValuesContext };
