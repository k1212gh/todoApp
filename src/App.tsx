// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import TodoPage from "./components/pages/TodoPage";
import CalendarPage from "./components/pages/CalendarPage";
import ChartPage from "./components/pages/ChartPage";

import { ThemeProvider } from "styled-components";
import { theme } from "./components/theme/blue_thema";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/chart" element={<ChartPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
