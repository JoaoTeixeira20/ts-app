import { memo, ReactElement } from 'react'; // we need this to make JSX compile
import { itemComponentType } from '../../ItemComponent';

import * as S from './TextInput.styles';

const TextInput = ({ ...props }: itemComponentType): ReactElement => {
  console.log('i rerendered type', props.type, 'name', props.name);

  return (
    <div>
      <label>{props.label}</label>
      <S.TextInput
        type={props.type}
        defaultValue={props.defaultValue}
        name={props.name}
        onChange={props.onChangeAction}
      ></S.TextInput>
    </div>
  );
};

export default memo(TextInput);
