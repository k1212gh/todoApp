// src/components/templates/MainTemplate.tsx
import React from "react";
import styled from "styled-components";
import ButtonGroup from "../organisms/ButtonGroup";
import Button from "../atoms/Button";
import Tasks from "../molecules/tasks";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  min-height: 100vh;
  height: fit-content;
  background: ${(props) => props.theme.colors.background};
`;

const ColumnContainer = styled.div`
  width: 95vw;
  margin: 0px auto;
`;

const VerticalContainer = styled.div`
  width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.header`
  font-size: 60px;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

interface MainTemplateProps {
  onAddButtonClick?: () => void;
}

const MainTemplate: React.FC<MainTemplateProps> = ({ onAddButtonClick }) => {
  return (
    <Container>
      <ColumnContainer>
        <Header>할 일 관리 시스템</Header>
        <ButtonGroup />
        <Button onClick={() => onAddButtonClick?.()}>+ 추가</Button>
        <Tasks day = {'Today'}></Tasks>
        <Tasks day = {'Tomorrow'}></Tasks>
        <Tasks day = {'Next 7 Days'}></Tasks>

      </ColumnContainer>

      {/* <VerticalContainer>
        
        </VerticalContainer> */}
    </Container>
  );
};

export default MainTemplate;
