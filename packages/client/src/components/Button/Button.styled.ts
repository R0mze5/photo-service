import styled from "styled-components";

export const StyledButton = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${({ theme }) => theme.blueColor};
  text-align: center;
  padding: 7px 0;
  font-size: 14px;
  cursor: pointer;
`;
