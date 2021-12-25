import { ReactElement, SyntheticEvent } from 'react'; // we need this to make JSX compile

import { inputTypePropsType } from '../../../../configuration/configuration';

const RangeInput = ({ ...props }: inputTypePropsType): ReactElement => {
  const changeEvent = (event: SyntheticEvent<HTMLInputElement>) => {
    props.onChangeAction && props.onChangeAction(event);
  };

  return (
    <>
      <label>{props.content?.text}</label>
      <input
        type='range'
        onChange={changeEvent}
        value={(typeof props.value !== 'boolean' && props.value) || ''}
      ></input>
    </>
  );
};

export default RangeInput;
