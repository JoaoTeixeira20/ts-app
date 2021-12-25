import { ReactElement } from 'react'; // we need this to make JSX compile

import { inputTypePropsType } from '../../../../configuration/configuration';

const RadioInput = ({ ...props }: inputTypePropsType): ReactElement => {
  return (
    <div>
      {props.content?.fields?.map((field) => {
        return (
          <div key={field.key}>
            <input
              type='radio'
              checked={props.value === field?.value}
              name={props.content.key}
              onChange={props.onChangeAction}
              value={(typeof field.value !== 'boolean' && field.value) || ''}
            ></input>
            <label>{field.text}</label>
          </div>
        );
      })}
    </div>
  );
};

export default RadioInput;
