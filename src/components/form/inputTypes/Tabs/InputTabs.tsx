import { ReactElement, SyntheticEvent, useEffect, useState } from 'react'; // we need this to make JSX compile
import { formType } from '../../../../configuration/configuration';

import * as S from './Tabs.styles';
import NestedFormComponent from '../../NestedFormComponent';
import { itemComponentType } from '../../ItemComponent';

const Tabs = (props: itemComponentType): ReactElement => {
  const [activeValue, setActiveValue] = useState<string>();
  const [activeItem, setActiveItem] = useState<formType | undefined>();

  const changeItems = (event: SyntheticEvent<HTMLInputElement>): void => {
    setActiveValue(event.currentTarget.value);
    props.onChangeAction && props.onChangeAction(event);
  };

  const isActiveValue = (currentValue: string = ''): boolean => {
    return currentValue === activeValue;
  };

  useEffect(() => {
    setActiveValue(props.defaultValue || props.subForm?.fields[0].label);
  }, [props.defaultValue, props.subForm?.fields]);

  useEffect(() => {
    setActiveItem(
      props.subForm?.fields.find((el) => el.label === activeValue)?.subForm
    );
  }, [activeValue, props.subForm]);

  return (
    <>
      <S.TabsContainer>
        {props.subForm?.fields.map((subFormItem) => {
          return (
            <S.TabItem
              type='button'
              isActive={isActiveValue(subFormItem.label)}
              onClick={changeItems}
              key={subFormItem.subForm?.id}
              value={subFormItem.label}
            ></S.TabItem>
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
