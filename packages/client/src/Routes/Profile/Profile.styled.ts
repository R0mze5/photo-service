import { FatText } from "src/components/FatText";
import styled from "styled-components";

export const StyledContainer = styled.div`
  min-height: 80vh;
  justify-content: center;
  align-items: center;
`;

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const StyledHeaderColumn = styled.div`
  &:first-child {
    margin-right: 60px;
  }
`;

export const StyledUsernameContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

export const StyledUsername = styled.span`
  font-size: 26px;
  display: block;
`;

export const StyledFullName = styled(FatText)`
  font-size: 16px;
`;

export const StyledCountContainer = styled.ul`
  display: flex;
  margin-bottom: 15px;
`;
export const StyledCount = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export const StyledBio = styled.p`
  margin-top: 10px;
`;

export const StyledPostsContainer = styled.div``;
