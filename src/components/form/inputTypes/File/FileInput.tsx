import { ChangeEvent, ReactElement, useState } from "react"; // we need this to make JSX compile

import { formItemType } from "../../../../configuration/configuration";

import * as S from "../../Form.styles";

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
    <>
      <label>{content?.text}</label>
      <input type={content?.inputType} onChange={onChangeAction}></input>
      <S.FilePreviewContainer key="4">
        <div>
          <input
            type="checkbox"
            onChange={togglePreview}
            checked={showPreview}
          ></input>
          <label>Show content?</label>
        </div>
        {showPreview && (
          <S.FilePreview
            dangerouslySetInnerHTML={{ __html: value || "" }}
          ></S.FilePreview>
        )}
      </S.FilePreviewContainer>
    </>
  );
};

export default FileInput;
