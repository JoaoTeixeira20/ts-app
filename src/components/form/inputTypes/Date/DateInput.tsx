import { ReactElement } from 'react'; // we need this to make JSX compile

import { itemComponentType } from '../../ItemComponent';

const DateInput = ({ ...props }: itemComponentType): ReactElement => {
  return (
    <div>
      <label>{props.label}</label>
      <input
        type={props.type}
        onChange={props.onChangeAction}
        defaultValue={props.defaultValue}
      ></input>
    </div>
  );
};

export default DateInput;
