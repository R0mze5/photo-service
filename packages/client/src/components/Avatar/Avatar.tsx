import { Container, Image } from "./Avatar.styled";

export interface AvatarProps {
  size?: "sm" | "md" | "lg";
  url?: string | null;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = "sm",
  url,
  className,
}) => {
  return (
    <Container className={className} size={size}>
      <Image src={url || "#"}></Image>
    </Container>
  );
};
