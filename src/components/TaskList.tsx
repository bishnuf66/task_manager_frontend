import React, { useState, useEffect, useRef } from "react";
import {
  Trash2,
  CheckCircle,
  Circle,
  Search,
  Filter,
  EllipsisVertical,
} from "lucide-react";
import { fetchTasks, deleteTask, updateTask } from "../services/taskService";
import toast from "react-hot-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";
  startDate: string | null;
  dueDate: string | null;
  isCompleted: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, []);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setOpenDropdownId(null);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully.");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    }
  };

  const handleCheckbox = async (taskId: string, isCompleted: boolean) => {
    try {
      await updateTask(taskId, { isCompleted });
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, isCompleted } : task
        )
      );
      toast.success(
        `Task ${isCompleted ? "completed" : "uncompleted"} successfully!`
      );
    } catch (error) {
      console.error("Failed to update task completion status", error);
    }
  };

  const formatDate = (date: string | null) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "ALL" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tasks</h2>

      {/* Search + Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="border rounded-md pl-9 pr-3 py-2 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELED">Canceled</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-600">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg shadow p-4 border space-y-2"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleCheckbox(task.id, !task.isCompleted)}
                    title="Toggle completion"
                    className="text-blue-600"
                  >
                    {task.isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                  <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-700">{task.description}</p>
                    <div className="text-sm text-gray-600 mt-1">
                      <p>
                        <strong>Priority:</strong> {task.priority}
                      </p>
                      <p>
                        <strong>Status:</strong> {task.status}
                      </p>
                      <p>
                        <strong>Start:</strong> {formatDate(task.startDate)} |{" "}
                        <strong>Due:</strong> {formatDate(task.dueDate)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() =>
                      setOpenDropdownId((prev) =>
                        prev === task.id ? null : task.id
                      )
                    }
                    className="text-gray-600 hover:text-black p-1"
                    title="Actions"
                  >
                    <EllipsisVertical />
                  </button>

                  {openDropdownId === task.id && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10">
                      <button
                        onClick={() => {
                          setOpenDropdownId(null);
                          toast(`Editing ${task.id}`);
                        }}
                        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(task.id);
                          setOpenDropdownId(null);
                        }}
                        className="w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
