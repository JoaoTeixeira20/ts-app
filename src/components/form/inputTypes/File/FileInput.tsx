import { ReactElement, useState } from 'react'; // we need this to make JSX compile

import { itemComponentType } from '../../ItemComponent';

import * as S from './FileInput.styles';

const FileInput = (props: itemComponentType): ReactElement => {
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div>
      <label>{props.label}</label>
      <input type={props.type} onChange={props.onFileChangeAction}></input>
      <input
        type='checkbox'
        onChange={togglePreview}
        checked={showPreview}
      ></input>
      <label>Show content?</label>
      <S.FilePreviewContainer>
        {showPreview && <S.FilePreview>{props.value}</S.FilePreview>}
      </S.FilePreviewContainer>
    </div>
  );
};

export default FileInput;
