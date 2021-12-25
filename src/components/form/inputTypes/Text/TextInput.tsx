import { ReactElement } from 'react'; // we need this to make JSX compile

import { inputTypePropsType } from '../../../../configuration/configuration';

import * as S from './TextInput.styles';

const TextInput = ({ ...props }: inputTypePropsType): ReactElement => {
  return (
    <div>
      <label>{props.content?.text}</label>
      <S.TextInput
        type={props.content?.inputType}
        value={(typeof props.value !== 'boolean' && props.value) || ''}
        onFocus={props.onFocusAction}
        onChange={props.onChangeAction}
        onBlur={props.onBlurAction}
        pattern={props.pattern}
        required={props.required}
      ></S.TextInput>
      {!props.validationParameters?.status && (
        <span>{props.validationParameters?.message}</span>
      )}
    </div>
  );
};

export default TextInput;
