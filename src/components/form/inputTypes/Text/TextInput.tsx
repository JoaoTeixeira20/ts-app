import { ReactElement } from 'react'; // we need this to make JSX compile
import { itemComponentType } from '../../ItemComponent';

import * as S from './TextInput.styles';

const TextInput = ({ ...props }: itemComponentType): ReactElement => {
  return (
    <div>
      <label>{props.label}</label>
      <S.TextInput
        type={props.type}
        value={props.value}
        name={props.name}
        // onFocus={props.onFocusAction}
        onChange={props.onChangeAction}
        // onBlur={props.onBlurAction}
        // pattern={props.pattern || undefined}
        // required={props.required || undefined}
        // form={props.form || undefined}
      ></S.TextInput>
    </div>
  );
};

export default TextInput;
