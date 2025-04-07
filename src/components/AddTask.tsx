import React, { useState } from "react";
import { createTask } from "../services/taskService";
import { X, Calendar, Flag, FileText, ListTodo } from "lucide-react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

interface AddTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.LOW);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask(title, description, startDate, dueDate, priority);
      toast.success("Task created successfully!");
      setTitle("");
      setDescription("");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FileText className="text-blue-600" /> Create a Task
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2">
                <ListTodo className="text-gray-500" />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task Title"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <FileText className="text-gray-500" />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task Description"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="text-gray-500" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="text-gray-500" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div className="flex items-center gap-2">
                <Flag className="text-gray-500" />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  {Object.values(TaskPriority).map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0) + level.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Create Task
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTask;
