import { SyntheticEvent, ReactElement, useState } from 'react'; // we need this to make JSX compile

import { inputTypePropsType } from '../../../../configuration/configuration';
import FormBuilder from '../../FormBuilder';

import * as S from './CollapseInput.styles';

const CollapseInput = ({ ...props }: inputTypePropsType): ReactElement => {
  const [opened, setOpened] = useState<boolean>(false);

  const toggleCollapse = (_: SyntheticEvent<HTMLDivElement>) => {
    setOpened(!opened);
  };

  return (
    <>
      <S.CollapseItem isActive={opened} onClick={toggleCollapse}>
        {props.content?.text}
      </S.CollapseItem>
      {opened && (
        <FormBuilder
          content={props.content?.fields}
          mainFormKey={props.content?.key}
        />
      )}
    </>
  );
};

export default CollapseInput;
