import styled from "styled-components";

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

export const StyledFiles = styled.div``;

export const StyledFile = styled.img`
  max-width: 100%;
`;

export const StyledMeta = styled.div`
  padding: 15px;
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
