import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  border: 1px solid black;
  width: 100%;
`;

const FormLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid black;
  padding: 20px;
`;

const InputLabel = styled.label`
  width: 50%;
  text-align: left;
`;

const InputType = styled.input`
  width: 100%;
`;

const SelectType = styled.select`
  width: 100%;
`;

const FilePreviewContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormSftpSettingsContainer = styled.div`
  padding: 20px;
`;

export {
  FormContainer,
  FormContent,
  FormLine,
  InputLabel,
  InputType,
  SelectType,
  FilePreviewContainer,
  FormSftpSettingsContainer,
};
