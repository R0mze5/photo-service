import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

export const StyledContainer = styled.div`
  ${({ theme }) => theme.whiteBox};
  width: 100%;
  max-width: 600px;

  &:not(:last-child) {
    margin-bottom: 25px;
  }
`;

export const StyledHeader = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

export const StyledUserColumn = styled.div`
  margin-left: 10px;
`;

export const StyledLocation = styled.address`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

export const StyledFiles = styled.div`
  position: relative;
  height: 600px;
  overflow: hidden;
`;

export const StyledFile = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: ${({ theme }) => theme.bgColor};
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};

  transition: opacity 2s;
`;

export const StyledFileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const StyledMeta = styled.div`
  padding: 15px;
  user-select: none;
`;

export const StyledButtons = styled.div`
  cursor: pointer;
  margin-bottom: 10px;
  &:first-child {
    margin-right: 10px;
  }
`;
export const StyledButton = styled.button`
  background: none;
  border: none;
`;

export const StyledTimestamp = styled.data`
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  margin: 10px 0;
  padding-bottom: 10px;
  font-weight: 400;
  font-size: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.lightGrayColor};
`;

export const StyledTextarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  :focus {
    outline: none;
  }
`;

export const StyledCaption = styled.div`
  margin-top: 10px;
`;

export const StyledComments = styled.ul`
  margin-top: 10px;
`;
export const StyledComment = styled.li`
  margin-bottom: 7px;
`;
