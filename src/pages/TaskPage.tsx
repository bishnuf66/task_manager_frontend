// src/pages/TaskPage.tsx
import React, { useState } from "react";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import Header from "../components/Header";

const TaskPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <Header />

      {/* Add Task */}
      <div className=" justify-end flex">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Task
        </button>

        <AddTask isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>

      {/* Task List */}
      <TaskList />
    </div>
  );
};

export default TaskPage;
