import { ReactElement } from 'react'; // we need this to make JSX compile

import { inputTypePropsType } from '../../../../configuration/configuration';

const ButtonInput = ({ ...props }: inputTypePropsType): ReactElement => {
  return (
    <input
      type='button'
      value={props.content?.text}
      onClick={props.onClickAction}
    />
  );
};

export default ButtonInput;
