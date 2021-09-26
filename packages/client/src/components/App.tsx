import GlobalStyles from "../styles/GlobalStyles";
import styled, { ThemeProvider } from "styled-components";
import { gql } from "apollo-boost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";

const Query = gql`
  {
    isLoggedIn @client
  }
`;

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.maxWidth};
  width: 100%;
`;

import Theme from "../styles/Theme";
import { AppRouter } from "./AppRouter";
import { useQuery } from "react-apollo-hooks";
import { Footer } from "./Footer";
import { Header } from "./Header";

export default (): JSX.Element => {
  const { data } = useQuery(Query);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles></GlobalStyles>
      <BrowserRouter>
        <Container>
          {data.isLoggedIn && <Header isLoggedIn={data.isLoggedIn}></Header>}
          <Wrapper>
            <AppRouter isLoggedIn={data.isLoggedIn}></AppRouter>
            <ToastContainer position={"bottom-left"}></ToastContainer>
          </Wrapper>
          <Footer></Footer>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};
