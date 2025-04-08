// api/task.ts
import api from './api';  // Import the axios instance

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const response = await api.get('/tasks');  // Use api here
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface TaskCreatePayload {
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  priority: string;
}

// Create a new task
export const createTask = async ({
  title,
  description,
  startDate,
  dueDate,
  priority,
}: TaskCreatePayload) => {
  try {
    const response = await api.post('/tasks', {
      title,
      description,
      startDate,
      dueDate,
      priority,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface TaskUpdatePayload {
  title?: string;
  description?: string;
  priority?: string;
  startDate?: string;
  dueDate?: string;
  isCompleted?: boolean;
}

// Update a task
export const updateTask = async (
  taskId: string,
  updatedFields: TaskUpdatePayload
) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, updatedFields);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId: string) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
