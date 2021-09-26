import { IconLogo } from "../Icons/IconLogo";
import { Container } from "./Loader.styled";

export const Loader: React.FC = () => {
  return (
    <Container>
      <IconLogo size={36}></IconLogo>
    </Container>
  );
};
