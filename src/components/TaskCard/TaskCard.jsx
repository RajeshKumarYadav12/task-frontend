import "./TaskCard.css";

const TaskCard = ({ task, onDelete, onEdit }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>
        Status: <strong>{task.completed?"Completed" : "In Progress"}</strong>
      </p>
      <button className="updateButton" onClick={() => onEdit(task)}>
        Update Task
      </button>
      <button onClick={() => onDelete(task._id)}>Delete Task</button>
    </div>
  );
};

export default TaskCard;
