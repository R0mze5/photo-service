import styled from "styled-components";

export const StyledWrapper = styled.div`
  min-height: 50vh;
  text-align: center;
`;

export const StyledCardsWrapper = styled.div`
  margin-bottom: 50px;
`;

export const StyledSection = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 160px);
  gap: 25px;
  grid-auto-rows: 160px;
  grid-template-rows: 160px;
`;
