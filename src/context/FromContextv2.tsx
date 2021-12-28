import {
  createContext,
  PropsWithChildren,
  ReactElement,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import Tabs from '../components/formv2/inputTypes/Tabs/InputTabs';
import { fieldType, formType } from '../configuration/configurationv2';
import { getValueFromDotNotationIndex, strToObj } from '../helpers/utils';
import { FormValuesContext } from './FormValuesContext';

type formContextType = {
  id?: string;
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
          </>
        );
      }}
    </FormContext.Consumer>
  );
};

const ItemComponent = (props: fieldType): ReactElement => {
  const [value, setValue] = useState<string>('');
  const { id } = useContext(FormContext);
  const { values, mergeValues } = useContext(FormValuesContext);
  const fieldidPath = `${id}.${props.name}`;

  const onChangeAction = (event: SyntheticEvent<HTMLInputElement>): void => {
    const actionValue = event.currentTarget.value;
    const nestedValue = strToObj(fieldidPath, actionValue);
    setValue(actionValue);
    mergeValues(nestedValue);
  };

  // useEffect(() => {
  //   // console.log(JSON.stringify(nestedValue, null, ' '));
  // }, [value]);

  useEffect(() => {
    try {
      const filteredValue = getValueFromDotNotationIndex(values, fieldidPath);
      setValue(filteredValue);
    } catch (e) {
      console.log('cannot find key on values context');
    }
  }, []);

  return props.type === 'tabs' ? (
    <Tabs {...props} />
  ) : (
    <>
      <div style={{ border: '1px solid red' }}>itemformid: {fieldidPath}</div>
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
      <div style={{ border: '1px solid black' }}>form id: {id}</div>
      {props.fields.map((field) => {
        return <ItemComponent key={field.name} {...field}></ItemComponent>;
      })}
    </>
  );
};

export const FormComponent = (props: wrappedFormType): ReactElement => {
  return (
    <>
      <FormContextConsumer id={props.content?.id}>
        <FormBuilder {...props.content} />
      </FormContextConsumer>
    </>
  );
};
