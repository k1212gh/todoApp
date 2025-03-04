import React from "react";
import styled from "styled-components";

const StyledText = styled.p`
  font-size: 16px;
  color: white;
  font-weight: bold;
`;

interface TextProps {
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ children }) => {
  return <StyledText>{children}</StyledText>;
};

export default Text;
