// src/components/atoms/Input.tsx
import React from "react";
import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

const StyledInput = styled.input<InputProps>`
  padding: 8px;
  border: 1px solid #000000;
  border-radius: 5px;
  font-size: 16px;
  color: #000000;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
`;

const Input: React.FC<InputProps> = ({ fullWidth = false, ...props }) => {
  return <StyledInput fullWidth={fullWidth} {...props} />;
};

export default Input;
