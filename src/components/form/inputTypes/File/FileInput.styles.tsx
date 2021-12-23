import styled from "styled-components";

const FilePreviewContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FilePreview = styled.div`
  top: 20px;
  right: 0px;
  position: absolute;
  display: flex;
  width: 500px;
  height: 500px;
  overflow: scroll;
  background-color: yellow;
  z-index: 1;
  border: 2px solid black;
  padding: 20px;
  white-space: pre-wrap;
  text-align: left;
`;

export { FilePreviewContainer, FilePreview };
