import { ReactElement } from 'react'; // we need this to make JSX compile

import { inputTypePropsType } from '../../../../configuration/configuration';

const DateInput = ({ ...props }: inputTypePropsType): ReactElement => {
  return (
    <div>
      <label>{props.content?.text}</label>
      <input
        type={props.content?.inputType}
        onChange={props.onChangeAction}
        value={(typeof props.value !== 'boolean' && props.value) || ''}
      ></input>
    </div>
  );
};

export default DateInput;
