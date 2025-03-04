// src/components/pages/TodoPage.tsx

import React, { useState } from "react";
import styled from "styled-components";
import Spacer from "../atoms/Spacer";
import InputModal, { Task } from "../organisms/InputModal";
import useLocalStorageTasks from "../../hook/useLocalStorageTasks";

const Container = styled.div`
  background: ${(props) => props.theme.colors.background};
  padding: 20px;
  color: #fff;
  height: 100vh;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #999;
    padding: 8px;
    text-align: center;
  }
`;

/**
 * D-Day 혹은 남은 시간을 계산하는 함수
 * @param taskDate yyyy-mm-dd
 * @param taskTime HH:mm
 * @returns 예: "D-3", "D+2", "마감됨", "4시간 30분 남음" 등
 */
function getDDayOrTimeLeft(taskDate: string, taskTime: string): string {
  if (!taskDate || !taskTime) return "-";

  const now = new Date();
  // taskDate, taskTime을 합쳐 타겟 시각 생성 (분까지)
  // ex) 2023-06-20 + T + 13:30 -> 2023-06-20T13:30:00
  const target = new Date(`${taskDate}T${taskTime}:00`);

  const diffMs = target.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // 날짜가 미래면 D-n / 과거면 D+n
  // 날짜가 같으면 시간(시/분) 남은 것 표시
  if (diffDays > 0) {
    return `D-${diffDays}`; // 아직 날짜가 남음
  } else if (diffDays < 0) {
    return `D+${Math.abs(diffDays)}`; // 날짜 지남
  } else {
    // 날짜(diffDays=0)는 오늘
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

    if (diffHours > 0 || diffMinutes > 0) {
      // 아직 시간이 남았음
      if (diffHours > 0) {
        return `${diffHours}시간 ${diffMinutes}분 남음`;
      } else {
        return `${diffMinutes}분 남음`;
      }
    } else {
      // 시간이 이미 지남
      return "마감됨";
    }
  }
}

const TodoPage: React.FC = () => {
  // 로컬 스토리지와 연동
  const [allTasks, setAllTasks] = useLocalStorageTasks("all_tasks", []);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // “수정” 버튼 클릭 시
  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  // 모달에서 확인(onConfirm) 시: 중복 체크 + 수정/추가 로직
  const handleConfirm = (newTask: Task) => {
    const isDuplicate = allTasks.some(
      (t) =>
        t.task === newTask.task &&
        t.task_date === newTask.task_date &&
        t.task_time === newTask.task_time &&
        t.task_priority === newTask.task_priority &&
        t.id !== newTask.id
    );
    if (isDuplicate) {
      alert("이미 같은 일정이 존재합니다!");
      return;
    }

    // (1) 수정 모드
    if (newTask.id) {
      const updated = allTasks.map((t) =>
        t.id === newTask.id ? { ...t, ...newTask } : t
      );
      setAllTasks(updated);
    } 
    // (2) 추가 모드
    else {
      const finalTask = { ...newTask, id: crypto.randomUUID(), completed: 0 };
      setAllTasks([...allTasks, finalTask]);
    }

    // 모달 종료
    setEditModalOpen(false);
    setSelectedTask(null);
  };

  // “완료” 버튼
  const handleComplete = (id: string) => {
    const updated = allTasks.map((t) =>
      t.id === id ? { ...t, completed: 1 } : t
    );
    setAllTasks(updated);
  };

  // “삭제” 버튼
  const handleDelete = (id: string) => {
    const filtered = allTasks.filter((t) => t.id !== id);
    setAllTasks(filtered);
  };

  // 진행중(미완료) / 완료된 할 일 분리
  const inProgressTasks = allTasks.filter((t) => t.completed === 0);
  const completedTasks = allTasks.filter((t) => t.completed === 1);
  const failedTask = allTasks.filter((t) => t.completed === -1);
  return (
    <Container>
      <h1>{Date.now()}</h1>
      <h2>Todo Page</h2>

      {/* 새 할 일 추가 버튼 */}
      <button
        onClick={() => {
          setSelectedTask(null);
          setEditModalOpen(true);
        }}
      >
        새 할 일 추가
      </button>

      <Spacer size={16} />

      {/* 진행중 목록 */}
      <h3>진행중</h3>
      <hr />
      <Spacer size={4} />

      <Table>
        <thead>
          <tr>
            <th>D-Day/남은시간</th>
            <th>할 일</th>
            <th>날짜</th>
            <th>시간</th>
            <th>중요도</th>
            <th>상태</th>
            <th>수정</th>
            <th>완료</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {inProgressTasks.map((task) => (
            <tr key={task.id}>
              {/* D-Day/남은시간 계산 */}
              <td>{getDDayOrTimeLeft(task.task_date, task.task_time)}</td>
              <td>{task.task}</td>
              <td>{task.task_date}</td>
              <td>{task.task_time}</td>
              <td>{task.task_priority}</td>
              <td>{task.completed === 1 ? "완료" : "미완료"}</td>
              <td>
                <button onClick={() => handleEditClick(task)}>수정</button>
              </td>
              <td>
                {task.completed !== 1 && (
                  <button onClick={() => handleComplete(task.id!)}>
                    완료
                  </button>
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(task.id!)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Spacer size={24} />

      {/* 완료 목록 */}
      <h3>완료</h3>
      <hr />
      <Spacer size={4} />

      <Table>
        <thead>
          <tr>
            <th>할 일</th>
            <th>날짜</th>
            <th>시간</th>
            <th>중요도</th>
            <th>상태</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.task}</td>
              <td>{task.task_date}</td>
              <td>{task.task_time}</td>
              <td>{task.task_priority}</td>
              <td>{task.completed === 1 ? "완료" : "미완료"}</td>
              <td>
                <button onClick={() => handleEditClick(task)}>수정</button>
              </td>
              <td>
                <button onClick={() => handleDelete(task.id!)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>미완료료</h3>
      <hr />
      <Spacer size={4} />
      <Table>
        <thead>
          <tr>
            <th>할 일</th>
            <th>날짜</th>
            <th>시간</th>
            <th>중요도</th>
            <th>상태</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {failedTask.map((task) => (
            <tr key={task.id}>
              <td>{task.task}</td>
              <td>{task.task_date}</td>
              <td>{task.task_time}</td>
              <td>{task.task_priority}</td>
              <td>{task.completed === 1 ? "완료" : "미완료"}</td>
              <td>
                <button onClick={() => handleEditClick(task)}>수정</button>
              </td>
              <td>
                <button onClick={() => handleDelete(task.id!)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* 수정/추가 모달 */}
      <InputModal
        visible={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedTask(null);
        }}
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
    </Container>
  );
};

export default TodoPage;
