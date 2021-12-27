import {
  createContext,
  PropsWithChildren,
  ReactElement,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fieldType, formType } from '../configuration/configurationv2';
import { strToObj } from '../helpers/utils';
import { FormValuesContext } from './FormValuesContext';

type formContextType = {
  id: string;
};

const FormContext = createContext({} as formContextType);

const FormContextProvider = (props: PropsWithChildren<formContextType>) => {
  const value = props;

  return (
    <FormContext.Provider value={value}>{props.children}</FormContext.Provider>
  );
};

const FormContextConsumer = (
  mainprops: PropsWithChildren<formContextType>
): ReactElement => {
  const { values } = useContext(FormValuesContext);
  const checkValues = () => {
    console.log(values);
  };
  return (
    <FormContext.Consumer>
      {(props: PropsWithChildren<formContextType>): ReactElement => {
        return (
          <>
            <FormContextProvider
              {...{
                ...props,
                id: props.id
                  ? `${props.id}.${mainprops.id}`
                  : `${mainprops.id}`,
              }}
            >
              {mainprops.children}
            </FormContextProvider>
            <button onClick={checkValues}>check values</button>
          </>
        );
      }}
    </FormContext.Consumer>
  );
};

const ItemComponent = (props: fieldType): ReactElement => {
  const [value, setValue] = useState<string>('');
  const { id } = useContext(FormContext);
  const { mergeValues } = useContext(FormValuesContext);

  const onChangeAction = (event: SyntheticEvent<HTMLInputElement>): void => {
    setValue(event.currentTarget.value);
  };

  useEffect(() => {
    const nestedValue = strToObj(`${id}.${props.name}`, value);
    // console.log(JSON.stringify(nestedValue, null, ' '));
    mergeValues(nestedValue);
  }, [value]);

  return (
    <>
      {/* <div style={{ border: '1px solid red' }}> itemformid: {id}</div> */}
      <div> label: {props.label}</div>
      <div> name: {props.name}</div>
      <input type='text' value={value} onChange={onChangeAction} />
      {Array.isArray(props.subForm)
        ? props.subForm.map((form) => {
            return <FormComponent key={form.id} content={form} />;
          })
        : props.subForm && <FormComponent content={props.subForm} />}
    </>
  );
};

type wrappedFormType = {
  content: formType;
};

const FormBuilder = (props: formType): ReactElement => {
  const { id } = useContext(FormContext);

  return (
    <>
      <div style={{ border: '1px solid black' }}>{id}</div>
      {props.fields.map((field) => {
        return <ItemComponent key={field.name} {...field}></ItemComponent>;
      })}
    </>
  );
};

export const FormComponent = (props: wrappedFormType): ReactElement => {
  return (
    <>
      <FormContextConsumer id={props.content.id}>
        <FormBuilder {...props.content} />
      </FormContextConsumer>
    </>
  );
};
