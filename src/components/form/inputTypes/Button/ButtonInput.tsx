import { MouseEvent, ReactElement } from "react"; // we need this to make JSX compile

import { formItemType } from "../../../../configuration/configuration";

type buttonInputType = {
  content?: formItemType;
  onClickAction: (event: MouseEvent<HTMLInputElement>) => void;
};

const ButtonInput = ({
  content,
  onClickAction,
}: buttonInputType): ReactElement => {
  return <input type="button" value={content?.text} onClick={onClickAction} />;
};

export default ButtonInput;
