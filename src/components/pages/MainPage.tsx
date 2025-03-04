// src/components/pages/MainPage.tsx
import React, { useState } from "react";
import MainTemplate from "../templates/MainTemplate";
import InputModal, { Task } from "../organisms/InputModal";
import useLocalStorageTasks from "../../hook/useLocalStorageTasks";
// "추가"만 담당
const MainPage: React.FC = () => {
  const [allTasks, setAllTasks] = useLocalStorageTasks("all_tasks", []);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleConfirm = (newTask: Task) => {
    // 중복 일정 확인
    const isDuplicate = allTasks.some(
      (t) =>
        t.task === newTask.task &&
        t.task_date === newTask.task_date &&
        t.task_time === newTask.task_time &&
        t.task_priority === newTask.task_priority
    );
  
    if (isDuplicate) {
      alert("이미 같은 일정이 존재합니다!");
      return;
    }
  
    // 새로운 일정에 고유 ID 추가 (기존에 없으면 생성)
    const finalTask = { ...newTask, id: crypto.randomUUID(), completed: 0 };
      setAllTasks([...allTasks, finalTask]);

  
    // 모달 닫기 및 선택된 할 일 초기화
    setEditModalOpen(false);
    setSelectedTask(null);
  };
  
  return (
    <>
      <MainTemplate onAddButtonClick={() => {setSelectedTask(null);
          setEditModalOpen(true);}} />

      <InputModal
        visible={editModalOpen}
        onClose={() => {setEditModalOpen(false);
            setSelectedTask(null);}}
        initTask={
          selectedTask || {
            task: "",
            task_date: "",
            task_time: "",
            task_priority: "0",
          }
        }
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default MainPage;
