import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from 'react';

import {
  uploadConfiguration,
  formType,
  formItemType,
} from '../configuration/configuration';

type NestedType = {
  content?: formType;
  prevFormKey?: string;
};

type itemType = {
  content: formItemType;
  prevFormKey: string;
};

interface IFormContext {
  formKeys?: Record<string, string>;
  keyIndex: string;
  setKeyValue: ({ key, value }: FormFieldType) => void;
}

type FormFieldType = {
  key: string;
  value: string;
};

const NestedContext = createContext({ keyIndex: 'emptyroot' } as IFormContext);

const NestedContextProvider = (props: PropsWithChildren<IFormContext>) => {
  const [formKeys, setFormKeys] = useState<Record<string, string>>();

  const setKeyValue = ({ key, value }: FormFieldType): void => {
    window.electronAPI.storeData({ key, value });
    setFormKeys({ ...formKeys, [key]: value });
  };

  const value = { formKeys, keyIndex: props.keyIndex, setKeyValue };

  return (
    <NestedContext.Provider value={value}>
      {props.children}
    </NestedContext.Provider>
  );
};

const Item = ({ ...props }: itemType): ReactElement => {
  return (
    <>
      <div style={{ border: '1px solid black' }}>
        <div>text: {props.content.text}</div>
        <div>key: {props.content.key}</div>
        <div>input: {props.content.inputType}</div>
        <div style={{ whiteSpace: 'pre-wrap' }}>
          fields:
          {props.content.fields?.map((field) => {
            return <div key={field.key}>{field.key}</div>;
          })}
        </div>
      </div>
      <NestedForm
        content={props.content.fields}
        prevFormKey={props.content.key}
      />
    </>
  );
};

const NestedForm = ({ ...props }: NestedType): ReactElement => {
  const { keyIndex } = useContext(NestedContext);

  return (
    <NestedContext.Consumer>
      {(context: PropsWithChildren<IFormContext>): ReactElement => {
        console.log('im consuming ', context, 'with props', props);

        return (
          <>
            {/* <div>{context.keyIndex}</div> */}
            <NestedContextProvider
              keyIndex={`${context.keyIndex}.${props.prevFormKey}`}
              setKeyValue={context.setKeyValue}
              formKeys={context.formKeys}
            >
              {props.content && props.content.length > 0 ? (
                props.content?.map((field) => {
                  return (
                    <>
                      <div>{keyIndex}</div>
                      <Item
                        key={field.key}
                        content={field}
                        prevFormKey={props.prevFormKey || 'idonthavekey'}
                      />
                    </>
                  );
                })
              ) : (
                <div style={{ border: '1px solid black', color: 'orange' }}>
                  empty
                </div>
              )}
            </NestedContextProvider>
          </>
        );
      }}
    </NestedContext.Consumer>
  );
};

export const Test = (): ReactElement => {
  return <NestedForm content={uploadConfiguration}></NestedForm>;
};
