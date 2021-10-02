import React from "react";
import { StyledButton } from "./Button.styled";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
