import styled, { keyframes } from "styled-components";

const Animation = keyframes`
0% {
  opacity: 0
}
50% {
  opacity: 1
}
100% {
  opacity: 0
}
`;

export const Container = styled.div`
  animation: ${Animation} 1s linear infinite;
`;
