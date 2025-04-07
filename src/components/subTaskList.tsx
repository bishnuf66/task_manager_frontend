// src/components/SubTaskList.tsx
import React, { useState } from "react";

interface SubTask {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface Props {
  subTasks: SubTask[];
  onStatusChange?: (id: string, isCompleted: boolean) => void;
}

const SubTaskList: React.FC<Props> = ({ subTasks, onStatusChange }) => {
  const [localSubTasks, setLocalSubTasks] = useState(subTasks);

  const handleToggle = async (subTaskId: string, isChecked: boolean) => {
    try {
      //   await updateSubTaskStatus(subTaskId, isChecked);
      const updated = localSubTasks.map((sub) =>
        sub.id === subTaskId ? { ...sub, isCompleted: isChecked } : sub
      );
      setLocalSubTasks(updated);
      onStatusChange?.(subTaskId, isChecked);
    } catch (err) {
      console.error("Error updating subtask:", err);
    }
  };

  return (
    <div className="mt-2">
      <p className="font-medium text-sm">Subtasks:</p>
      <ul className="space-y-1 pl-4">
        {localSubTasks.map((sub) => (
          <li key={sub.id} className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={sub.isCompleted}
              onChange={(e) => handleToggle(sub.id, e.target.checked)}
              className="accent-green-500"
            />
            <span
              className={sub.isCompleted ? "line-through text-gray-500" : ""}
            >
              {sub.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubTaskList;
