import React, { ReactElement, SyntheticEvent, useEffect } from 'react'; // we need this to make JSX compile

import { inputTypePropsType } from '../../../../configuration/configuration';

import * as S from './Tabs.styles';
import InputBuilder from '../../InputBuilder';

const Tabs = ({ ...props }: inputTypePropsType): ReactElement => {
  const [activeItem, setActiveItem] = React.useState<string | undefined>('');

  const changeItems = (event: SyntheticEvent<HTMLDivElement>): void => {
    const value = event.currentTarget.dataset;
    setActiveItem(value['index']);
  };

  const isActiveItem = (activeItem: string | undefined, key: string): boolean =>
    activeItem === key;

  useEffect(() => {
    setActiveItem(props.content.fields?.[0]?.key || '');
  }, [props.content.fields]);

  return (
    <>
      <S.TabsContainer>
        {props.content.fields?.map((menuItem) => {
          return (
            <S.TabItem
              isActive={isActiveItem(activeItem, menuItem.key)}
              onClick={changeItems}
              key={menuItem.key}
              data-index={menuItem.key}
            >
              {menuItem.text}
            </S.TabItem>
          );
        })}
      </S.TabsContainer>
      <S.TabsContentContainer>
        {activeItem && (
          <InputBuilder
            field={props.content.fields?.find(
              (field) => field.key === activeItem
            )}
            mainFormKey={props.content.key}
          />
        )}
      </S.TabsContentContainer>
    </>
  );
};

export default Tabs;
