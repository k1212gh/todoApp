// src/components/pages/CalendarPage.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  color: #fff;
  margin-top: 20px;
`;

interface Task {
  task: string;
  task_date: string; // YYYY-MM-DD
  task_time: string;
  task_priority: string;
  completed?: number;
  id?: string;
  // ...
}

const CalendarPage: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());

  const [dates, setDates] = useState<number[]>([]);
  const [startDay, setStartDay] = useState<number>(0);
  const [thisLastDate, setThisLastDate] = useState<number>(0);

  // all_tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("all_tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // 달력 계산
  useEffect(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const thisLast = new Date(currentYear, currentMonth + 1, 0).getDate();

    setStartDay(firstDay);
    setThisLastDate(thisLast);

    // 42칸 생성
    const prevLast = new Date(currentYear, currentMonth, 0).getDate();

    const temp: number[] = [];
    // prev
    for (let i = firstDay - 1; i >= 0; i--) {
      temp.push(prevLast - i);
    }
    // current
    for (let i = 1; i <= thisLast; i++) {
      temp.push(i);
    }
    // next
    for (let i = 1; temp.length < 42; i++) {
      temp.push(i);
    }
    setDates(temp);
  }, [currentYear, currentMonth]);

  // 이전달/다음달/오늘
  const goPrev = () => {
    let m = currentMonth - 1;
    let y = currentYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    }
    setCurrentYear(y);
    setCurrentMonth(m);
  };
  const goNext = () => {
    let m = currentMonth + 1;
    let y = currentYear;
    if (m > 11) {
      m = 0;
      y += 1;
    }
    setCurrentYear(y);
    setCurrentMonth(m);
  };
  const goToday = () => {
    const now = new Date();
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
  };

  // 날짜 클릭
  const handleClickDate = (dateNum: number, isThisMonth: boolean) => {
    if (!isThisMonth) return;
    const mm = String(currentMonth + 1).padStart(2, "0");
    const dd = String(dateNum).padStart(2, "0");
    const dateStr = `${currentYear}-${mm}-${dd}`;

    // 해당 날짜의 할 일
    const filtered = tasks.filter((t) => t.task_date === dateStr);
    if (filtered.length === 0) {
      alert(`${dateStr}\n등록된 할 일이 없습니다.`);
    } else {
      alert(
        `[${dateStr} 할 일]\n` +
          filtered.map((f) => `- ${f.task} (${f.task_time})`).join("\n")
      );
    }
  };

  return (
    <div style={{ background: `linear-gradient(135deg, rgba(0, 45, 26, 0.78), rgba(120, 120, 120, 0.31)), 
      url("https://www.transparenttextures.com/patterns/concrete-wall.png")`,height: "100vh",padding: "20px" }}>
      <h2>
        {currentYear}년 {currentMonth + 1}월
      </h2>
      <Button onClick={goPrev}>이전</Button>
      <Button onClick={goToday}>오늘</Button>
      <Button onClick={goNext}>다음</Button>

      <CalendarGrid>
        {/* 요일 표시 */}
        {["일","월","화","수","목","금","토"].map((d) => (
          <div key={d} style={{ textAlign: "center", fontWeight: "bold" }}>{d}</div>
        ))}

        {/* 42칸 날짜 */}
        {dates.map((num, idx) => {
          const isPrev = idx < startDay;
          const isNext = idx >= startDay + thisLastDate;
          const isThisMonth = !isPrev && !isNext;

          return (
            <div
              key={idx}
              style={{
                border: "1px solid #888",
                minHeight: "80px",
                textAlign: "right",
                padding: "5px",
                cursor: isThisMonth ? "pointer" : "default",
                color: isThisMonth ? "#fff" : "#aaa",
              }}
              onClick={() => handleClickDate(num, isThisMonth)}
            >
              {num}
            </div>
          );
        })}
      </CalendarGrid>
    </div>
  );
};

export default CalendarPage;
