// src/hooks/useLocalStorageTasks.ts
import { useState, useEffect } from "react";

export interface Task {
  id?: string;
  task: string;
  task_date: string;
  task_time: string;
  task_priority: string;
  completed?: number;
  task_D_day?: string;
}

/**
 * localStorage에 저장/불러오기를 자동으로 해주는 커스텀 훅
 * @param key localStorage key 이름
 * @param initialValue 기본값 (localStorage에 값이 없을 때 사용)
 * @returns [tasks, setTasks] 형태로 반환
 */
export default function useLocalStorageTasks(key: string, initialValue: Task[] = []) {
  // 1. 로컬 스토리지에서 초기값 불러오기
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (e) {
      console.warn("로컬 스토리지에서 값을 불러오는 중 오류 발생:", e);
      return initialValue;
    }
  });

  // 2. tasks가 변동될 때마다 localStorage에 자동 저장
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(tasks));
    } catch (e) {
      console.error("로컬 스토리지 저장 중 오류 발생:", e);
    }
  }, [tasks, key]);

  // 3. 훅에서 (tasks, setTasks) 반환
  return [tasks, setTasks] as const;
}
