import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledOverlay = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.1s linear;
`;
export const StyledContainer = styled(Link)<{ background: string }>`
  overflow: hidden;
  background-image: url(${({ background }) => background});
  background-size: cover;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    ${StyledOverlay} {
      opacity: 1;
    }
  }
`;

export const StyledNumber = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.postBgColor};
  &:first-child {
    margin-right: 20px;
  }
  svg {
    fill: ${({ theme }) => theme.postBgColor};
  }
`;
export const StyledNumberText = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;
