import { ReactElement, useState } from 'react'; // we need this to make JSX compile

import { inputTypePropsType } from '../../../../configuration/configuration';

import * as S from './FileInput.styles';

const FileInput = ({ ...props }: inputTypePropsType): ReactElement => {
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div>
      <label>{props.content?.text}</label>
      <input
        type={props.content?.inputType}
        onChange={props.onFileAction}
      ></input>
      <input
        type='checkbox'
        onChange={togglePreview}
        checked={showPreview}
      ></input>
      <label>Show content?</label>
      <S.FilePreviewContainer>
        {showPreview && (
          <S.FilePreview
            dangerouslySetInnerHTML={{
              __html:
                (typeof props.value !== 'boolean' &&
                  typeof props.value !== 'number' &&
                  props.value) ||
                '',
            }}
          ></S.FilePreview>
        )}
      </S.FilePreviewContainer>
    </div>
  );
};

export default FileInput;
