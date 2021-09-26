import { Container, Image } from "./Avatar.styled";

interface AvatarProps {
  size?: "sm" | "md" | "lg";
  url?: string | null;
}

export const Avatar: React.FC<AvatarProps> = ({ size = "sm", url }) => {
  return (
    <Container size={size}>
      <Image src={url || "#"}></Image>
    </Container>
  );
};
