// src/components/pages/ChartPage.tsx
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import styled, { useTheme } from "styled-components";
import Spacer from "../atoms/Spacer";

// 스타일 지정 (배경 포함)
const Container = styled.div`
  /* 전체 영역 크기 및 테마 배경 적용 */
  width: 100%;
  height: 100vh;
  padding: 20px;
  color: #fff;
  background: ${(props) => props.theme.colors.background};
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  justify-content: center;
  position: relative;
  width: 100%;
  height: 350px;
`;

const ChartPage: React.FC = () => {
  // 1) theme 가져오기 (styled-components의 ThemeProvider로부터)
  const theme = useTheme();

  // 2) localStorage로부터 로드
  const all_tasks = JSON.parse(localStorage.getItem("all_tasks") || "[]");
  const total = all_tasks.length;
  const completed = all_tasks.filter((t: any) => t.completed === 1).length;
  const inProgress = all_tasks.filter((t: any) => t.completed === 0).length;
  const failed = all_tasks.filter((t: any) => t.completed === -1).length;

  // 3) chart.js를 위한 canvas ref
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // chartjs-plugin-datalabels 등록
    Chart.register(ChartDataLabels);

    // 4) 도넛 차트 생성
    const doughnutChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["완료된 할 일", "미완료 할 일", "실패한 할 일"],
        datasets: [
          {
            data: [completed, inProgress, failed],
            backgroundColor: ["#4CAF50", "#FFC107", "#FF5733"],
            hoverBackgroundColor: ["#45a049", "#FFA000", "#d32f2f"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
          datalabels: {
            color: "#fff",
            font: {
              weight: "bold",
              size: 16,
            },
            formatter: (value) => {
              const percentage =
                total > 0 ? ((value as number) / total) * 100 : 0;
              return `${percentage.toFixed(1)}%`;
            },
          },
        },
      },
    });

    // 언마운트 시 차트 정리
    return () => {
      doughnutChart.destroy();
    };
  }, [completed, inProgress, failed, total]);

  return (
    <Container>
      <div style={{ marginBottom: "20px" }}>
        <h2>Chart Page</h2>
      </div>

      <Spacer size={20} />

      <ChartWrapper>
        <Spacer size={20} />
        <p>총 작업 수: {total}</p>
        <p>
          완료: {completed}, 진행중: {inProgress}, 실패: {failed}
        </p>
        <canvas ref={chartRef} />
      </ChartWrapper>
    </Container>
  );
};

export default ChartPage;
