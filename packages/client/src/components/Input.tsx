import React from "react";
import styled from "styled-components";

const Container = styled.input`
  background-color: ${({ theme }) => theme.bgColor};
  border: ${({ theme }) => theme.boxBorder};
  border-radius: ${({ theme }) => theme.borderRadius};
  height: 35px;
  padding: 0 15px;
  font-size: 12px;
`;

interface Props {
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  className?: string;
}

const Input: React.FC<Props> = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = "text",
  className,
}) => {
  return (
    <Container
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      className={className}
    ></Container>
  );
};

export default Input;
