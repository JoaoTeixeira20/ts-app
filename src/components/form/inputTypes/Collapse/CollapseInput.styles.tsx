import styled from "styled-components";

type collapseItemType = {
  isActive: boolean;
};

const CollapseItem = styled.div<collapseItemType>`
  border: ${({ isActive }) =>
    isActive ? "2px solid black" : "1px solid gray"};
  padding: 10px;
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? "#170F4F" : "#00BAC7")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  border-radius: 6px;
  font-weight: bold;
  user-select: none;
  flex: 1;
`;

export { CollapseItem };
