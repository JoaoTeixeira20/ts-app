import { ReactElement } from 'react'; // we need this to make JSX compile

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
    </>
  );
};

export default FormBuilder;
