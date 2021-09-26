import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Box = styled.div`
  ${({ theme }) => theme.whiteBox};
  border-radius: 0px;
  max-width: 350px;
  width: 100%;
`;

export const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0;
`;

export const Link = styled.span`
  color: ${({ theme }) => theme.blueColor};
  cursor: pointer;
`;

export const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  width: 100%;

  form {
    width: 100%;

    button {
      margin-top: 10px;
    }
  }

  input {
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 7px;
    }
  }
`;
