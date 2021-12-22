import { ChangeEvent, ReactElement } from "react"; // we need this to make JSX compile

import { formItemType } from "../../../../configuration/configuration";

type textInputType = {
  content?: formItemType;
  value?: string;
  onChangeAction: (event: ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({
  content,
  value,
  onChangeAction,
}: textInputType): ReactElement => {
  return (
    <>
      <label>{content?.text}</label>
      <input
        type={content?.inputType}
        value={value}
        onChange={onChangeAction}
      ></input>
    </>
  );
};

export default TextInput;
