import { createContext, PropsWithChildren, ReactElement } from 'react';

type formContextType = {
  id?: string;
};

export const FormContext = createContext({} as formContextType);

const FormContextProvider = (props: PropsWithChildren<formContextType>) => {
  return (
    <FormContext.Provider value={props}>{props.children}</FormContext.Provider>
  );
};

export const FormContextConsumer = (
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
