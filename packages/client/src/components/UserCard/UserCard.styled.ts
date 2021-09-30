import styled from "styled-components";
import { Avatar } from "../Avatar";
import { Link } from "react-router-dom";

export const StyledContainer = styled.div`
  ${({ theme }) => theme.whiteBox};
  display: flex;
  flex-direction: column;

  align-items: center;
  padding: 20px;
`;

export const StyledAvatar = styled(Avatar)`
  margin-bottom: 20px;
`;
export const StyledLink = styled(Link)`
  margin-bottom: 10px;
`;
