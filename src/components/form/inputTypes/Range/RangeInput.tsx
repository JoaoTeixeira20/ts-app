import { ReactElement, SyntheticEvent } from 'react'; // we need this to make JSX compile

import { formItemType } from '../../../../configuration/configuration';

type rangeInputType = {
  content?: formItemType;
  value?: number;
  onChangeAction: (event: SyntheticEvent<HTMLInputElement>) => void;
};

const RangeInput = ({
  content,
  onChangeAction,
}: rangeInputType): ReactElement => {
  const changeEvent = (event: SyntheticEvent<HTMLInputElement>) => {
    onChangeAction(event);
  };

  return (
    <>
      <label>{content?.text}</label>
      <input type='range' onMouseUp={changeEvent}></input>
    </>
  );
};

export default RangeInput;
