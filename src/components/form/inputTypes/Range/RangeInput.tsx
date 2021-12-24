import { ReactElement, SyntheticEvent } from 'react'; // we need this to make JSX compile

import { formItemType } from '../../../../configuration/configuration';

type rangeInputType = {
  content?: formItemType;
  value?: string | number | boolean;
  onChangeAction: (event: SyntheticEvent<HTMLInputElement>) => void;
};

const RangeInput = ({
  content,
  value,
  onChangeAction,
}: rangeInputType): ReactElement => {
  const changeEvent = (event: SyntheticEvent<HTMLInputElement>) => {
    onChangeAction(event);
  };

  return (
    <>
      <label>{content?.text}</label>
      <input
        type='range'
        onChange={changeEvent}
        value={(typeof value !== 'boolean' && value) || ''}
      ></input>
    </>
  );
};

export default RangeInput;
