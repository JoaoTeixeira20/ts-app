import { ReactElement, SyntheticEvent, useEffect, useState } from 'react'; // we need this to make JSX compile
import { formType } from '../../../../configuration/configuration';

import * as S from './Tabs.styles';
import NestedFormComponent from '../../NestedFormComponent';
import { itemComponentType } from '../../ItemComponent';

const Tabs = (props: itemComponentType): ReactElement => {
  const [activeValue, setActiveValue] = useState<string>();
  const [activeItem, setActiveItem] = useState<formType | undefined>();

  const handleClick = (event: SyntheticEvent<HTMLDivElement>): void => {
    const value = event.currentTarget.dataset['name'];
    setActiveValue(value);
    props.directFieldValueChange && props.directFieldValueChange(value);
  };

  const isActiveValue = (currentValue: string = ''): boolean => {
    return currentValue === activeValue;
  };

  useEffect(() => {
    setActiveValue(props.defaultValue || props.subForm?.fields[0].name);
  }, [props.defaultValue, props.subForm?.fields]);

  useEffect(() => {
    setActiveItem(
      props.subForm?.fields.find((el) => el.name === activeValue)?.subForm
    );
  }, [activeValue, props.subForm]);

  return (
    <>
      <S.TabsContainer>
        {props.subForm?.fields.map((subFormItem) => {
          return (
            <div
              style={{ width: '100%' }}
              key={subFormItem.subForm?.id}
              data-name={subFormItem.name}
              onClick={handleClick}
            >
              <S.TabItem
                type='button'
                isActive={isActiveValue(subFormItem.name)}
                key={subFormItem.subForm?.id}
                value={subFormItem.label}
              ></S.TabItem>
            </div>
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
