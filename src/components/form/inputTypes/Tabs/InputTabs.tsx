import { ReactElement, SyntheticEvent, useEffect, useState } from 'react'; // we need this to make JSX compile
import { fieldType, formType } from '../../../../configuration/configuration';
import {
  getFormByFieldItemName,
  isActiveItem,
} from '../../../../helpers/activeItemHelper';

import * as S from './Tabs.styles';
import NestedFormComponent from '../../NestedFormComponent';

const Tabs = (props: fieldType): ReactElement => {
  const [activeItem, setActiveItem] = useState<formType | undefined>();

  const changeItems = (event: SyntheticEvent<HTMLElement>): void => {
    const name = event.currentTarget.dataset['name'];
    setActiveItem(getFormByFieldItemName(props.subForm, name));
  };

  useEffect(() => {
    setActiveItem(
      getFormByFieldItemName(
        props.subForm,
        props.subForm?.fields.find((el) => el.value === props.defaultValue)
          ?.name
      )
    );
  }, [props.subForm, props.defaultValue]);

  return (
    <>
      <S.TabsContainer>
        {props.subForm?.fields.map((subFormItem) => {
          return (
            <S.TabItem
              isActive={isActiveItem(activeItem, subFormItem.subForm?.id)}
              key={subFormItem.subForm?.id}
              data-name={subFormItem.name}
              onClick={changeItems}
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
