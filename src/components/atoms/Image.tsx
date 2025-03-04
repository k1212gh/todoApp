// src/components/atoms/Image.tsx
import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface ImageProps {
  src: string;
  alt: string;
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  return <StyledImage src={src} alt={alt} />;
};

export default Image;
