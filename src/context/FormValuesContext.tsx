import { createContext, PropsWithChildren, useState } from 'react';
import { mergeDeep } from '../helpers/utils';

interface IFormContext {
  values: {};
  mergeValues: (valueToMerge: {}) => void;
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

  const value = { values, mergeValues };

  return (
    <FormValuesContext.Provider value={value}>
      {props.children}
    </FormValuesContext.Provider>
  );
};

export { FormValuesContextProvider, FormValuesContext };
