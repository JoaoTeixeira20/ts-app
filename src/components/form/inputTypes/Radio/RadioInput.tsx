import { ReactElement } from 'react'; // we need this to make JSX compile

import { itemComponentType } from '../../ItemComponent';

const RadioInput = ({ ...props }: itemComponentType): ReactElement => {
  return (
    <div>
      {!Array.isArray(props.subForm) &&
        Array.isArray(props.subForm?.fields) &&
        props.subForm?.fields.map((field) => {
          return (
            <div key={field.name}>
              <input
                type='radio'
                checked={props.value === field?.value}
                name={props.name}
                onChange={props.onChangeAction}
                value={(typeof field.value !== 'boolean' && field.value) || ''}
              ></input>
              <label>{field.label}</label>
            </div>
          );
        })}
    </div>
  );
};

export default RadioInput;
