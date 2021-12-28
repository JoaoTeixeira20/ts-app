import React, {
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react'; // we need this to make JSX compile
import { itemComponentType } from '../../ItemComponent';
import { fieldType, formType } from '../../../../configuration/configuration';
import {
  getActiveItemById,
  isActiveItem,
} from '../../../../helpers/activeItemHelper';
import FormComponent from '../../FormComponent';

import * as S from './Tabs.styles';

const Tabs = (props: itemComponentType): ReactElement => {
  const [activeItem, setActiveItem] = useState<formType | undefined>();

  const changeItems = (event: SyntheticEvent<HTMLDivElement>): void => {
    const value = event.currentTarget.dataset['id'];
    setActiveItem(getActiveItemById(props.subForm, value));
  };

  useEffect(() => {
    setActiveItem(
      getActiveItemById(
        props.subForm,
        Array.isArray(props.subForm) ? props.subForm?.[0]?.id : ''
      )
    );
  }, []);

  return (
    <>
      <S.TabsContainer>
        {Array.isArray(props.subForm) &&
          props.subForm?.map((subFormItem) => {
            return (
              <S.TabItem
                isActive={isActiveItem(activeItem, subFormItem.id)}
                onClick={changeItems}
                key={subFormItem.id}
                data-id={subFormItem.id}
              >
                {subFormItem.label}
              </S.TabItem>
            );
          })}
      </S.TabsContainer>
      <S.TabsContentContainer>
        {activeItem && <FormComponent content={activeItem} />}
      </S.TabsContentContainer>
    </>
  );
};

export default Tabs;
