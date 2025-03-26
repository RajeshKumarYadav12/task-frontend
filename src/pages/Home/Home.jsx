import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TaskCard from "../../components/TaskCard/TaskCard.jsx";
import "./Home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACKEND_URL; // Using Vite environment variable

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${URL}/tasks/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${URL}/tasks/update/${selectedTask._id}`,
        {
          title: selectedTask.title,
          description: selectedTask.description,
          completed: selectedTask.completed,
          status: selectedTask.status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedTask(null);
      await fetchTasks();
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask({
      ...task,
      completed: task.completed,
      status: task.status || "To Do",
    });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${URL}/tasks/add`,
        {
          title: newTask.title,
          description: newTask.description,
          completed: false,
          status: newTask.status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewTask({ title: "", description: "", status: "To Do" });
      setShowAddTaskModal(false);
      await fetchTasks();
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  return (
    <div className="home-container">
      <div className="header">
        <div className="header-content">
          <h1>Task Manager</h1>
          <button
            className="add-task-btn"
            onClick={() => setShowAddTaskModal(true)}
          >
            + Add Task
          </button>
        </div>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={deleteTask}
            onEdit={handleEditClick}
          />
        ))}
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Task</h2>
            <form onSubmit={handleAddTask}>
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Task Description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                required
              />
              <select
                value={newTask.status}
                onChange={(e) =>
                  setNewTask({ ...newTask, status: e.target.value })
                }
                required
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <button type="submit">Add Task</button>
              <button type="button" onClick={() => setShowAddTaskModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Update Task Modal */}
      {selectedTask && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Task</h2>
            <form onSubmit={handleUpdateTask}>
              <input
                type="text"
                value={selectedTask.title}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                value={selectedTask.description}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    description: e.target.value,
                  })
                }
                required
              />

              <select
                value={selectedTask.completed ? "true" : "false"}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    completed: e.target.value === "true",
                  })
                }
                required
              >
                <option value="To Do">To Do</option>
                <option value="false">In Progress</option>
                <option value="true">Completed</option>
              </select>

              <button type="submit">Update Task</button>
              <button type="button" onClick={() => setSelectedTask(null)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
