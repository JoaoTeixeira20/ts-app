import { memo, ReactElement } from 'react'; // we need this to make JSX compile
import { itemComponentType } from '../../ItemComponent';

import * as S from './TextInput.styles';

const TextInput = ({ ...props }: itemComponentType): ReactElement => {
  const onBlurAction = (event: any) => {
    console.log(event.currentTarget.value);
  };

  return (
    <div>
      <label>{props.label}</label>
      <S.TextInput
        type={props.type}
        defaultValue={props.defaultValue}
        name={props.name}
        onChange={props.onChangeAction}
        onBlur={onBlurAction}
      ></S.TextInput>
      {props.validationMessages &&
        props.validationMessages.map((message, index) => {
          return (
            <span key={index} style={{ color: 'red' }}>
              {message}
            </span>
          );
        })}
    </div>
  );
};

export default memo(TextInput);
