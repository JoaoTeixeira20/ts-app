import { ReactElement, useContext, useState } from 'react'; // we need this to make JSX compile
import { FormValuesContext } from '../../../../context/FormValuesContext';
import { FormPathContext } from '../../../../context/FromPathContext';

import { itemComponentType } from '../../ItemComponent';

import * as S from './FileInput.styles';

const FileInput = (props: itemComponentType): ReactElement => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const { id } = useContext(FormPathContext);
  const { getValueFromPath } = useContext(FormValuesContext);

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
        {showPreview && (
          <S.FilePreview>{getValueFromPath(id, props.name)}</S.FilePreview>
        )}
      </S.FilePreviewContainer>
    </div>
  );
};

export default FileInput;
