import { SyntheticEvent, ReactElement } from 'react'; // we need this to make JSX compile

import { formItemType } from '../../../../configuration/configuration';

import * as S from './TextInput.styles';

type textInputType = {
  content?: formItemType;
  value?: string;
  onChangeAction: (event: SyntheticEvent<HTMLInputElement>) => void;
  onBlurAction: (event: SyntheticEvent<HTMLInputElement>) => void;
  pattern: string;
  required: boolean;
};

const TextInput = ({
  content,
  value,
  onChangeAction,
  onBlurAction,
  pattern,
  required,
}: textInputType): ReactElement => {
  return (
    <div>
      <label>{content?.text}</label>
      <S.TextInput
        type={content?.inputType}
        value={value}
        onChange={onChangeAction}
        onBlur={onBlurAction}
        pattern={pattern}
        required={required}
      ></S.TextInput>
    </div>
  );
};

export default TextInput;
