import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle,
  Circle,
  Search,
  Filter,
  EllipsisVertical,
  Edit,
  Trash2,
  Clock,
  Calendar,
  AlertTriangle,
  Flag,
} from "lucide-react";
import { fetchTasks, deleteTask, updateTask } from "../services/taskService";
import toast from "react-hot-toast";
import AddTask from "./AddTask";
import DeleteConfirmationModal from "./DeleteConfirmModal";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  startDate: string | null;
  dueDate: string | null;
  isCompleted: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<boolean | null>(false);

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

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

  const handleDelete = async () => {
    if (!taskToDelete) return;

    try {
      await deleteTask(taskToDelete);
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
      toast.success("Task deleted successfully.");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    } finally {
      setDeleteModalOpen(false);
      setTaskToDelete(null);
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
      toast.success(`Task ${isCompleted ? "completed" : "marked as pending"}`);
    } catch (error) {
      console.error("Failed to update task completion status", error);
    }
  };

  const formatDate = (date: string | null) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "LOW":
        return "bg-green-100 text-green-800";
      case "MEDIUM":
        return "bg-blue-100 text-blue-800";
      case "HIGH":
        return "bg-orange-100 text-orange-800";
      case "URGENT":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return <AlertTriangle className="w-4 h-4 mr-1" />;
      case "HIGH":
        return <Flag className="w-4 h-4 mr-1" />;
      case "MEDIUM":
        return <Flag className="w-4 h-4 mr-1" />;
      case "LOW":
        return <Flag className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === null || task.isCompleted === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-xl shadow-sm">
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setTaskToDelete(null);
          }}
          onConfirm={handleDelete}
          title="Confirm Task Deletion"
          message="Are you sure you want to delete this task? This action cannot be undone."
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          + New Task
        </button>
        <AddTask isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>

      {/* Search + Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={
                statusFilter === null
                  ? "ALL"
                  : statusFilter === true
                  ? "COMPLETED"
                  : "PENDING"
              }
              onChange={(e) => {
                const value = e.target.value;
                if (value === "ALL") setStatusFilter(null);
                else if (value === "COMPLETED") setStatusFilter(true);
                else if (value === "PENDING") setStatusFilter(false);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500 text-lg">No tasks found</p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search filters or add a new task
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-lg shadow-sm border-l-4 ${
                task.isCompleted ? "border-green-500" : "border-blue-500"
              } transition-all duration-200 hover:shadow-md`}
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleCheckbox(task.id, !task.isCompleted)}
                      title={
                        task.isCompleted
                          ? "Mark as pending"
                          : "Mark as completed"
                      }
                      className={`mt-1 ${
                        task.isCompleted
                          ? "text-green-500"
                          : "text-gray-400 hover:text-blue-500"
                      }`}
                      aria-label={
                        task.isCompleted ? "Completed task" : "Pending task"
                      }
                    >
                      {task.isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <div className={`${task.isCompleted ? "opacity-70" : ""}`}>
                      <h3
                        className={`text-lg font-semibold ${
                          task.isCompleted
                            ? "line-through text-gray-500"
                            : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {task.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <div
                          className={`flex items-center px-2 py-1 rounded-full text-xs ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {getPriorityIcon(task.priority)}
                          {task.priority}
                        </div>
                        <div className="flex gap-4 mt-3 text-xs text-gray-500">
                          {task.startDate && (
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>Start: {formatDate(task.startDate)}</span>
                            </div>
                          )}
                          {task.dueDate && (
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              <span>Due: {formatDate(task.dueDate)}</span>
                            </div>
                          )}
                        </div>
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
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                      title="Actions"
                    >
                      <EllipsisVertical className="w-5 h-5" />
                    </button>

                    {openDropdownId === task.id && (
                      <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200 py-1">
                        <button
                          onClick={() => {
                            setOpenDropdownId(null);
                            toast(`Editing ${task.id}`);
                          }}
                          className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center text-gray-700"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setTaskToDelete(task.id);
                            setDeleteModalOpen(true);
                            setOpenDropdownId(null);
                          }}
                          className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
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
