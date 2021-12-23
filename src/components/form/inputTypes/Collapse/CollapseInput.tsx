import { MouseEvent, ReactElement, useState } from "react"; // we need this to make JSX compile

import { formItemType } from "../../../../configuration/configuration";
import FormBuilder from "../../FormBuilder";
import InputBuilder from "../../InputBuilder";

import * as S from "./CollapseInput.styles";

type collapseInputType = {
  content?: formItemType;
};

const CollapseInput = ({ content }: collapseInputType): ReactElement => {
  const [opened, setOpened] = useState<boolean>(false);

  const toggleCollapse = (_: MouseEvent<HTMLDivElement>) => {
    setOpened(!opened);
  };

  return (
    <>
      <S.CollapseItem isActive={opened} onClick={toggleCollapse}>
        {content?.text}
      </S.CollapseItem>
      {opened && <FormBuilder fields={content?.fields} />}
    </>
  );
};

export default CollapseInput;
