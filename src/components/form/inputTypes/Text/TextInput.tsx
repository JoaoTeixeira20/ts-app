import React, {
  SyntheticEvent,
  ReactElement,
  ReactComponentElement,
} from 'react'; // we need this to make JSX compile

import {
  formItemType,
  validationStateType,
} from '../../../../configuration/configuration';

import * as S from './TextInput.styles';

type textInputType = {
  content?: formItemType;
  value?: string;
  onChangeAction: (event: SyntheticEvent<HTMLInputElement>) => void;
  onBlurAction: (event: SyntheticEvent<HTMLInputElement>) => void;
  onFocusAction: (event: SyntheticEvent<HTMLInputElement>) => void;
  pattern?: string;
  required?: boolean;
  validationParameters?: validationStateType;
};

const TextInput = ({
  content,
  value,
  onChangeAction,
  onBlurAction,
  onFocusAction,
  pattern,
  required,
  validationParameters,
}: textInputType): ReactElement => {
  return (
    <div>
      <label>{content?.text}</label>
      <S.TextInput
        type={content?.inputType}
        value={value}
        onFocus={onFocusAction}
        onChange={onChangeAction}
        onBlur={onBlurAction}
        pattern={pattern}
        required={required}
      ></S.TextInput>
      {!validationParameters?.status && (
        <span>{validationParameters?.message}</span>
      )}
    </div>
  );
};

export default TextInput;
