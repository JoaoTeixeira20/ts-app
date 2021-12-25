import {
  FormEvent,
  FormEventHandler,
  ReactElement,
  SyntheticEvent,
} from 'react'; // we need this to make JSX compile

import { formType } from '../../configuration/configuration';
import InputBuilder from './InputBuilder';

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
    <>
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
  );
};

export default FormBuilder;
