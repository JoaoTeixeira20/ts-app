import { ReactElement, SyntheticEvent, useEffect, useState } from 'react'; // we need this to make JSX compile
import { itemComponentType } from '../../ItemComponent';
import { formType } from '../../../../configuration/configuration';
import {
  getActiveItemById,
  getFormByFieldItemId,
  isActiveItem,
} from '../../../../helpers/activeItemHelper';

import * as S from './Tabs.styles';
import NestedFormComponent from '../../NestedFormComponent';

const Tabs = (props: itemComponentType): ReactElement => {
  const [activeItem, setActiveItem] = useState<formType | undefined>();

  const elementsForm = props.subForm?.fields.map((field) => {
    return field.subForm as formType;
  });

  const changeItems = (event: SyntheticEvent<HTMLDivElement>): void => {
    const value = event.currentTarget.dataset['id'];
    setActiveItem(getFormByFieldItemId(props.subForm, value));
  };

  useEffect(() => {
    setActiveItem(getActiveItemById(elementsForm, elementsForm?.[0].id));
  }, [elementsForm]);

  return (
    <>
      <S.TabsContainer>
        {props.subForm?.fields.map((subFormItem) => {
          return (
            <S.TabItem
              isActive={isActiveItem(activeItem, subFormItem.subForm?.id)}
              onClick={changeItems}
              key={subFormItem.subForm?.id}
              data-id={subFormItem.name}
            >
              {subFormItem.label}
            </S.TabItem>
          );
        })}
      </S.TabsContainer>
      <S.TabsContentContainer>
        {activeItem && (
          <NestedFormComponent
            activeItem={activeItem}
            subForm={props.subForm}
          />
        )}
      </S.TabsContentContainer>
    </>
  );
};

export default Tabs;
