import { SyntheticEvent, ReactElement } from 'react'; // we need this to make JSX compile

import { formItemType } from '../../../../configuration/configuration';

type dateInputType = {
  content?: formItemType;
  value?: string;
  onChangeAction: (event: SyntheticEvent<HTMLInputElement>) => void;
};

const DateInput = ({
  content,
  value,
  onChangeAction,
}: dateInputType): ReactElement => {
  return (
    <div>
      <label>{content?.text}</label>
      <input
        type={content?.inputType}
        onChange={onChangeAction}
        value={value}
      ></input>
    </div>
  );
};

export default DateInput;
