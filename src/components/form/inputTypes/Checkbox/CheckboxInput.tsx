import { ReactElement, SyntheticEvent } from 'react'; // we need this to make JSX compile

import { formItemType } from '../../../../configuration/configuration';

type checkboxInputType = {
  content?: formItemType;
  onChangeAction: (event: SyntheticEvent<HTMLInputElement>) => void;
};

const CheckboxInput = ({
  content,
  onChangeAction,
}: checkboxInputType): ReactElement => {
  const checkBoxChangeAction = (event: SyntheticEvent<HTMLInputElement>) => {
    event.currentTarget.value = event.currentTarget.checked.toString();
    onChangeAction(event);
  };

  return (
    <div>
      <input type='checkbox' onChange={checkBoxChangeAction}></input>
      <label>{content?.text}</label>
    </div>
  );
};

export default CheckboxInput;
