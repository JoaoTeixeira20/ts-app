import { ReactElement, SyntheticEvent, useState } from 'react'; // we need this to make JSX compile

import { itemComponentType } from '../../ItemComponent';

const CheckboxInput = ({ ...props }: itemComponentType): ReactElement => {
  const [checked, setChecked] = useState<boolean>(
    (props.defaultValue && JSON.parse(props.defaultValue)) || false
  );
  const checkBoxChangeAction = (event: SyntheticEvent<HTMLInputElement>) => {
    setChecked(!checked);
    event.currentTarget.value = event.currentTarget.checked.toString();
    props.onChangeAction && props.onChangeAction(event);
  };

  return (
    <div>
      <input
        type='checkbox'
        onChange={checkBoxChangeAction}
        checked={checked}
      ></input>
      <label>{props.label}</label>
    </div>
  );
};

export default CheckboxInput;
