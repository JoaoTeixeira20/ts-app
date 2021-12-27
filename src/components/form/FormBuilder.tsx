import { FormEvent, ReactElement, ReactNode } from 'react'; // we need this to make JSX compile

import { formType } from '../../configuration/configuration';
import InputBuilder from './InputBuilder';
import {
  FormContext,
  FormContextProvider,
  IFormContext,
} from '../../context/FormContext';

type formBuilderProps = {
  content?: formType;
  mainFormKey?: string;
};

const FormBuilder = ({
  content,
  mainFormKey,
}: formBuilderProps): ReactElement => {
  const checkElements = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('event is ', event);
    // for (const element in event.currentTarget.elements) {
    //   console.log(typeof element);
    // }
    console.log('validating ', event.currentTarget.id);
    Array.prototype.map.call(
      event.currentTarget.elements,
      (ele: HTMLInputElement) => {
        if (ele.type !== 'submit') {
          console.log('field ', ele.name, 'has value ', ele.value);
        }
      }
    );
  };

  return (
    <FormContext.Consumer>
      {(value: IFormContext): ReactNode => {
        return (
          <>
            {/* <div>{value.keyIndex}</div> */}
            <FormContext.Provider
              value={{
                ...value,
                keyIndex: `${value.keyIndex}.${mainFormKey || ''}`,
              }}
            >
              <>
                <div>{`${value.keyIndex}.${mainFormKey || ''}`}</div>
                {content &&
                  content?.length > 0 &&
                  content.map((field) => {
                    return (
                      <InputBuilder
                        key={field.key}
                        field={field}
                        mainFormKey={mainFormKey || 'root'}
                      />
                    );
                  })}
                {content?.[0].inputType !== 'option' && (
                  <form id={mainFormKey || 'root'} onSubmit={checkElements}>
                    <input
                      type='submit'
                      form={mainFormKey || 'root'}
                      value='check this form'
                    ></input>
                  </form>
                )}
              </>
            </FormContext.Provider>
          </>
        );
      }}
    </FormContext.Consumer>
  );
};

export default FormBuilder;
