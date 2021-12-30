import { SyntheticEvent, ReactElement, useState } from 'react'; // we need this to make JSX compile

import { itemComponentType } from '../../ItemComponent';
import FormComponent from '../../FormComponent';

import * as S from './CollapseInput.styles';

const CollapseInput = ({ ...props }: itemComponentType): ReactElement => {
  const [opened, setOpened] = useState<boolean>(false);

  const toggleCollapse = (_: SyntheticEvent<HTMLDivElement>) => {
    setOpened(!opened);
  };

  return (
    <>
      <S.CollapseItem isActive={opened} onClick={toggleCollapse}>
        {props.label}
      </S.CollapseItem>
      {opened && props.subForm && <FormComponent content={props.subForm} />}
    </>
  );
};

export default CollapseInput;
