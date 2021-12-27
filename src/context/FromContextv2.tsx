import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useEffect,
} from 'react';
import { fieldType, formType } from '../configuration/configurationv2';

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
  useEffect(() => {
    console.log('id is ', mainprops.id);
  }, [mainprops.id]);

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

const FormComponent = (props: formType): ReactElement => {
  const { id } = useContext(FormContext);

  return (
    <>
      <div>{id}</div>
      {props.fields.map((field) => {
        return <ItemComponent key={field.name} {...field}></ItemComponent>;
      })}
    </>
  );
};

const ItemComponent = (props: fieldType): ReactElement => {
  return (
    <>
      <div> label: {props.label}</div>
      <div> name: {props.name}</div>
      {Array.isArray(props.subForm)
        ? props.subForm.map((form) => {
            return <WrappedForm key={form.id} content={form} />;
          })
        : props.subForm && <WrappedForm content={props.subForm} />}
    </>
  );
};

type wrappedFormType = {
  content: formType;
};

export const WrappedForm = (props: wrappedFormType): ReactElement => {
  return (
    <>
      <FormContextConsumer id={props.content.id}>
        <FormComponent {...props.content} />
      </FormContextConsumer>
    </>
  );
};
