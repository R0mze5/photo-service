import React from "react";
import { StyledButton } from "./Button.styled";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {text}
    </StyledButton>
  );
};
