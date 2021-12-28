import { createContext, PropsWithChildren, ReactElement } from 'react';

type formContextType = {
  id?: string;
};

export const FormPathContext = createContext({} as formContextType);

const FormPathContextProvider = (props: PropsWithChildren<formContextType>) => {
  return (
    <FormPathContext.Provider value={props}>
      {props.children}
    </FormPathContext.Provider>
  );
};

export const FormPathContextConsumer = (
  mainprops: PropsWithChildren<formContextType>
): ReactElement => {
  return (
    <FormPathContext.Consumer>
      {(props: PropsWithChildren<formContextType>): ReactElement => {
        return (
          <>
            <FormPathContextProvider
              {...{
                ...props,
                id: props.id
                  ? `${props.id}.${mainprops.id}`
                  : `${mainprops.id}`,
              }}
            >
              {mainprops.children}
            </FormPathContextProvider>
          </>
        );
      }}
    </FormPathContext.Consumer>
  );
};
