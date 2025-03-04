// src/components/organisms/InputModal.tsx

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Select from "../atoms/Select";

// Task 인터페이스
export interface Task {
  id?: string;
  task: string;          // 할 일
  task_date: string;     // yyyy-mm-dd
  task_time: string;     // HH:mm
  task_priority: string; // "0" | "1" | "2" | "3" | "4"
  completed?: number;    // 0(미완료), 1(완료), -1(실패) 등
}

interface InputModalProps {
  visible: boolean;                  // 모달 열림/닫힘 여부
  onClose: () => void;               // 모달 닫기 핸들러
  initTask: Task;                    // 모달 초기값(추가/수정 시)
  onConfirm: (result: Task) => void; // 확인 버튼 클릭 시 상위로 값 전달
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; 
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const Container = styled.div`
  background-color: #ffffff;
  width: 300px;
  height: 280px;
  border: 1px solid #cccccc;
  border-radius: 20px;
  padding: 20px;
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
              0 3px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const InputModal: React.FC<InputModalProps> = ({
  visible,
  onClose,
  initTask,
  onConfirm
}) => {
  const [task, setTask] = useState<Task>(initTask);

  // initTask가 바뀔 때마다 내부 state를 갱신
  useEffect(() => {
    setTask(initTask);
  }, [initTask]);

  // visible이 false면 아예 렌더링하지 않음
  if (!visible) return null;

  // Input/Select 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  // 확인 버튼
  const handleConfirmClick = () => {
    // 간단한 필수 입력 검증
    const missingFields: string[] = [];
    if (!task.task) missingFields.push("할 일");
    if (!task.task_date) missingFields.push("날짜");
    if (!task.task_time) missingFields.push("시간");
    if (task.task_priority === "0") missingFields.push("우선순위");

    if (missingFields.length > 0) {
      alert(`${missingFields.join(", ")}을(를) 입력해주세요.`);
      return;
    }

    // 상위 컴포넌트에 결과 전달
    onConfirm(task);
  };

  return (
    <>
      {/* 모달 바깥을 클릭하면 닫힐 수 있도록 설정 */}
      <Backdrop onClick={onClose} />
      <Container>
        <h3 style={{ marginBottom: "10px" }}>
          {task.id ? "할 일 수정" : "할 일 추가"}
        </h3>

        <Input
          type="text"
          name="task"
          placeholder="할 일을 입력하세요"
          value={task.task}
          onChange={handleChange}
        />

        <Input
          type="date"
          name="task_date"
          value={task.task_date}
          onChange={handleChange}
        />

        <Input
          type="time"
          name="task_time"
          value={task.task_time}
          onChange={handleChange}
        />

        <Select
          name="task_priority"
          value={task.task_priority}
          onChange={handleChange}
        >
          <option value="0">중요도 선택</option>
          <option value="4">매우 높음 🔥🔥🔥</option>
          <option value="3">높음 🔥</option>
          <option value="2">보통 ⚡</option>
          <option value="1">낮음 🌱</option>
        </Select>

        <ButtonContainer>
          <Button onClick={onClose}>취소</Button>
          <Button onClick={handleConfirmClick}>
            {task.id ? "수정하기" : "추가하기"}
          </Button>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default InputModal;
