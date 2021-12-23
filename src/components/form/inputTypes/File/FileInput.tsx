import { ChangeEvent, ReactElement, useState } from "react"; // we need this to make JSX compile

import { formItemType } from "../../../../configuration/configuration";

import * as S from "./FileInput.styles";

type textInputType = {
  content?: formItemType;
  value?: string;
  onChangeAction: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FileInput = ({
  content,
  value,
  onChangeAction,
}: textInputType): ReactElement => {
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div>
      <label>{content?.text}</label>
      <input type={content?.inputType} onChange={onChangeAction}></input>
      <input
        type="checkbox"
        onChange={togglePreview}
        checked={showPreview}
      ></input>
      <label>Show content?</label>
      <S.FilePreviewContainer>
        {showPreview && (
          <S.FilePreview
            dangerouslySetInnerHTML={{ __html: value || "" }}
          ></S.FilePreview>
        )}
      </S.FilePreviewContainer>
    </div>
  );
};

export default FileInput;
