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
  setFormConfig: (formConfig: formType) => void;
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
  const [formConfig, setFormConfig] = useState<formType>(props.formConfig);

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

  const value = {
    values,
    formConfig,
    setFormConfig,
    getValueFromPath,
    setValueOnPath,
  };

  return (
    <FormValuesContext.Provider value={value}>
      {props.children}
    </FormValuesContext.Provider>
  );
};

export { FormValuesContextProvider, FormValuesContext };
