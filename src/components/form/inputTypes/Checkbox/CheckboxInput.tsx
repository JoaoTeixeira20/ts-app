import { ReactElement, SyntheticEvent } from 'react'; // we need this to make JSX compile

import { inputTypePropsType } from '../../../../configuration/configuration';

const CheckboxInput = ({ ...props }: inputTypePropsType): ReactElement => {
  const checkBoxChangeAction = (event: SyntheticEvent<HTMLInputElement>) => {
    event.currentTarget.value = event.currentTarget.checked.toString();
    props.onChangeAction && props.onChangeAction(event);
  };

  return (
    <div>
      <input
        type='checkbox'
        onChange={checkBoxChangeAction}
        checked={
          (typeof props.value !== 'string' &&
            typeof props.value !== 'number' &&
            props.value) ||
          false
        }
      ></input>
      <label>{props.content?.text}</label>
    </div>
  );
};

export default CheckboxInput;
