import styled from "styled-components";
import useLocalStorageTasks from "../../hook/useLocalStorageTasks";

// Task 인터페이스
interface Task {
    id: string;
    task: string;          // 할 일
    task_date: string;     // yyyy-mm-dd
    task_time: string;     // HH:mm
    task_priority: string; // "0" | "1" | "2" | "3" | "4"
    completed?: number;    // 0(미완료), 1(완료), -1(실패) 등
  }

const Container = styled.div`
  background-color: rgba(255,255,255,0.7);
  border: 0px;
  border-radius: 8px;
  margin:auto;
  font-size: 16px;
  width: 100%;
  width: fit-content;
  min-width: 70vw;
  min-height: 20vh;
  margin-bottom: 10px;
  & h3{
    font-size: 30px;
    margin-left: 5px;
    margin-bottom : 3px;
  }
  & p{
    margin-top: 3px;
    margin-right: 5px;
  }
`;

interface TasksProps{
    day : ('Today' )| ('Tomorrow' )| ('Next 7 Days');
    //daynum : 1| 2| 7;
}


function Tasks({ day }: TasksProps) {
    const [allTasks, setAllTasks] = useLocalStorageTasks("all_tasks", []);

    // 오늘 날짜(요일)
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1); // 내일 날짜
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7); // 7일 후 날짜

    // 특정 날짜의 YYYY-MM-DD 형식으로 변환
    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    // 필터링된 태스크 리스트
    const todaysTasks = allTasks.filter((task) => task.task_date === formatDate(today));
    const tomorrowsTasks = allTasks.filter((task) => task.task_date === formatDate(tomorrow));
    const sevenDaysTasks = allTasks.filter((task) => {
        const taskDate = new Date(task.task_date);
        return taskDate >= tomorrow && taskDate <= nextWeek;
    });
  
    let selecter = day== 'Today' ?todaysTasks: day == 'Tomorrow' ?tomorrowsTasks : sevenDaysTasks; 
  return (
    <Container>

        <h3>{day}</h3>
      {/* 필터링된 태스크만 표시 */}
      {selecter.map((task) => (
        
        <div>
            <p>◾{task.task_date}: {task.task}</p>

        </div>
      ))}
    </Container>
  );
}

export default Tasks;
