import { ReactElement } from 'react'; // we need this to make JSX compile

import { itemComponentType } from '../../ItemComponent';

const ButtonInput = ({ ...props }: itemComponentType): ReactElement => {
  return (
    <input type='button' value={props.label} onClick={props.onClickAction} />
  );
};

export default ButtonInput;
