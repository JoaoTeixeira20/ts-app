import { ReactElement, SyntheticEvent, useEffect, useState } from 'react'; // we need this to make JSX compile
import { formType } from '../../../../configuration/configuration';
import {
  getFormByFieldItemName,
  isActiveItem,
} from '../../../../helpers/activeItemHelper';

import * as S from './Tabs.styles';
import NestedFormComponent from '../../NestedFormComponent';
import { itemComponentType } from '../../ItemComponent';

const Tabs = (props: itemComponentType): ReactElement => {
  const [activeValue, setActiveValue] = useState<string>();
  const [activeItem, setActiveItem] = useState<formType | undefined>();

  const changeItems = (event: SyntheticEvent<HTMLInputElement>): void => {
    const name = event.currentTarget.dataset['name'];
    // setActiveItem(getFormByFieldItemName(props.subForm, name));
    setActiveValue(event.currentTarget.value);
    props.onChangeAction && props.onChangeAction(event);
  };

  const isActiveValue = (currentValue: string = ''): boolean => {
    return currentValue === activeValue;
  };

  // useEffect(() => {
  //   setActiveItem(
  //     getFormByFieldItemName(
  //       props.subForm,
  //       props.subForm?.fields.find((el) => el.value === props.defaultValue)
  //         ?.name
  //     )
  //   );
  // }, [props.subForm, props.defaultValue]);

  useEffect(() => {
    setActiveValue(props.defaultValue || props.subForm?.fields[0].label);
  }, []);

  useEffect(() => {
    setActiveItem(
      getFormByFieldItemName(
        props.subForm,
        props.subForm?.fields.find((el) => el.label === activeValue)?.label
      )
    );
  }, [activeValue]);

  return (
    <>
      <S.TabsContainer>
        {props.subForm?.fields.map((subFormItem) => {
          return (
            <S.TabItem
              type='button'
              isActive={isActiveValue(subFormItem.label)}
              data-name={subFormItem.name}
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
