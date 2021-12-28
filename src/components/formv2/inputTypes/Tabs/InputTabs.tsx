import React, { ReactElement, SyntheticEvent, useEffect } from 'react'; // we need this to make JSX compile

import { fieldType, formType } from '../../../../configuration/configurationv2';
import FormComponent from '../../FormComponent';

import * as S from './Tabs.styles';

const Tabs = ({ ...props }: fieldType): ReactElement => {
  const [activeItemId, setActiveItemId] = React.useState<string | undefined>(
    ''
  );
  const [activeItem, setActiveItem] = React.useState<formType>();

  const changeItems = (event: SyntheticEvent<HTMLDivElement>): void => {
    const value = event.currentTarget.dataset;
    setActiveItemId(value['id']);
  };

  const isActiveItem = (activeItem: string | undefined, key: string): boolean =>
    activeItem === key;

  useEffect(() => {
    setActiveItemId(
      (Array.isArray(props.subForm) && props.subForm?.[0]?.id) || ''
    );
  }, [props.subForm]);

  useEffect(() => {
    setActiveItem(
      Array.isArray(props.subForm)
        ? props.subForm.find((el) => el.id === activeItemId)
        : props.subForm
    );
  }, [activeItemId]);

  return (
    <>
      <S.TabsContainer>
        {Array.isArray(props.subForm) &&
          props.subForm?.map((subFormItem) => {
            return (
              <S.TabItem
                isActive={isActiveItem(activeItemId, subFormItem.id)}
                //isActive={true}
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
