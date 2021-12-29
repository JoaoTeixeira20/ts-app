import { ReactElement } from 'react'; // we need this to make JSX compile

import { itemComponentType } from '../../ItemComponent';

const RangeInput = (props: itemComponentType): ReactElement => {
  return (
    <>
      <label>{props.label}</label>
      <input
        type='range'
        onChange={props.onChangeAction}
        defaultValue={props.defaultValue}
      ></input>
    </>
  );
};

export default RangeInput;
