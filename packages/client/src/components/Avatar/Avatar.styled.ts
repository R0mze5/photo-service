import styled from "styled-components";

export const Container = styled.div<{ size: "sm" | "md" | "lg" }>`
  --container-size: ${({ size }) =>
    size === "sm"
      ? "30px"
      : size === "md"
      ? "50px"
      : size === "lg"
      ? "150px"
      : undefined};
  border-radius: 50%;
  width: var(--container-size);
  height: var(--container-size);
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;
