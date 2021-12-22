import styled from 'styled-components';

type tabItemType = {
    isActive: boolean
}

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const TabItem = styled.div<tabItemType>`
    border: ${({isActive}) => (isActive ? '2px solid black' : '1px solid gray')};
    padding: 10px; 
    cursor: pointer;
    background-color: ${({isActive}) => (isActive ? '#170F4F' : '#00BAC7')};
    color: ${({isActive}) => (isActive ? 'white' : 'black')};
    border-radius: 6px 6px 0 0;
    font-weight: bold;
    user-select: none;
`;

const TabsContentContainer = styled.div`
    padding:0 40px 60px 40px;
`;

const sftpToggleButton = styled.div`
    position: fixed;
    left: calc(50% - (200px / 2));
    bottom: 10px;
    border: 1px solid black;
    padding: 10px;
    width: 200px;
    height: 40px;
    user-select: none;
    cursor: pointer;
    background-color: yellow;
    z-index: 2;
`;

export { TabsContainer, TabItem, TabsContentContainer, sftpToggleButton };
