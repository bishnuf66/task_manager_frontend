// src/pages/TaskPage.tsx
import React from "react";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TaskPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-6 space-y-6">
        <TaskList />
      </main>

      <Footer />
    </div>
  );
};

export default TaskPage;
