import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface ButtonProps {
  image: string;
}
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`;
const Container = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  border: 2px solid white;
  border-radius: 8px;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.3);
  &:hover {
    transform: scale(1.1);
  }

  &:active {  
    transform: scale(0.9);
  }

  &:hover ${Overlay} {
    opacity: 1;
  }
`;

const Button = styled.div<ButtonProps>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  background-color: transparent;
  border: none;
`;



const OverlayText = styled.p`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

interface ImageButtonProps {
  image: string;
  route: string;
  alt?: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({ image, route, alt }) => {
  const navigate = useNavigate(); // React Router의 useNavigate 훅 사용

  return (
    <Container onClick={() => navigate(route)}>
      <Button image={image} aria-label={alt} />
      <Overlay>
        <OverlayText>{alt}</OverlayText>
      </Overlay>
    </Container>
  );
};

export default ImageButton;
