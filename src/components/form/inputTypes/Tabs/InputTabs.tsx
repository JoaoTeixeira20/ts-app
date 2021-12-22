import React, { ReactElement, MouseEvent, useEffect } from "react"; // we need this to make JSX compile

import { formItemType } from "../../../../configuration/configuration";

import * as S from "./Tabs.styles";
import InputBuilder from "../../InputBuilder";

type tabsType = {
  content: formItemType;
};

const Tabs = ({ content }: tabsType): ReactElement => {
  const [activeItem, setActiveItem] = React.useState<string | undefined>("");

  const changeItems = (event: MouseEvent<HTMLDivElement>): void => {
    const value = event.currentTarget.dataset;
    setActiveItem(value["index"]);
  };

  const isActiveItem = (activeItem: string | undefined, key: string): boolean =>
    activeItem === key;

  useEffect(() => {
    setActiveItem(content.fields?.[0]?.key || "");
  }, [content.fields]);

  return (
    <>
      <S.TabsContainer>
        {content.fields?.map((menuItem) => {
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
            field={content.fields?.find((field) => field.key === activeItem)}
          />
        )}
      </S.TabsContentContainer>
    </>
  );
};

export default Tabs;
