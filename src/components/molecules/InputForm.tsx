// src/components/molecules/InputForm.tsx
import React from "react";
import styled from "styled-components";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 150px;
  padding: 20px;
  position: relative;
  font-weight: 600;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
              0 3px 6px rgba(0, 0, 0, 0.23);
`;

function InputForm() {
  return (
    <Container>
      <Input placeholder="할 일을 입력하세요" />
      <Button onClick={() => alert("임시 버튼")}>추가</Button>
    </Container>
  );
}

export default InputForm;
