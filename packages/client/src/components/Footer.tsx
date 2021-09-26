// import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  margin: auto auto 0;
  padding: 50px 0;
  font-size: 12px;

  max-width: ${({ theme }) => theme.maxWidth};
  width: 100%;
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
  color: ${({ theme }) => theme.darkBlueColor};
`;

const Copyright = styled.span`
  color: ${({ theme }) => theme.darkGrayColor};
`;

export const Footer: React.FC = () => {
  return (
    <Container>
      <List>
        <ListItem>
          <Link href={"#"}>about us</Link>
        </ListItem>
        <ListItem>
          <Link href={"#"}>support</Link>
        </ListItem>
        <ListItem>
          <Link href={"#"}>press</Link>
        </ListItem>
        <ListItem>
          <Link href={"#"}>api</Link>
        </ListItem>
        <ListItem>
          <Link href={"#"}>job</Link>
        </ListItem>
        <ListItem>
          <Link href={"#"}>privacy</Link>
        </ListItem>
        <ListItem>
          <Link href={"#"}>terms</Link>
        </ListItem>
        <ListItem>
          <Link href={"#"}>direchrefry</Link>
        </ListItem>
        <ListItem>
          <Link href={"#"}>profiles</Link>
        </ListItem>
        <ListItem>
          <Link href={"#"}>hashtags</Link>
        </ListItem>
        <ListItem>
          <Link href={"#"}>language</Link>
        </ListItem>
      </List>
      <Copyright>Media service {new Date().getFullYear()} &copy;</Copyright>
    </Container>
  );
};
