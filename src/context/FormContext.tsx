import { createContext, PropsWithChildren, useState, useEffect } from "react";

type FormFieldType = {
  key: string;
  value: string;
};

interface IFormContext {
  formKeys: Record<string, string>;
  setKeyValue: ({ key, value }: FormFieldType) => void;
}

type FormContextPropsType = {};

export const FormContext = createContext({} as IFormContext);

const FormContextProvider = (
  props: PropsWithChildren<FormContextPropsType>
) => {
  const [formKeys, setFormKeys] = useState<Record<string, string>>({});

  useEffect(() => {
    const values = window.electronAPI.getData();
    setFormKeys(values);
  }, []);

  const setKeyValue = ({ key, value }: FormFieldType): void => {
    window.electronAPI.storeData({ key, value });
    setFormKeys({ ...formKeys, [key]: value });
  };

  return (
    <FormContext.Provider value={{ formKeys, setKeyValue }}>
      {props.children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
