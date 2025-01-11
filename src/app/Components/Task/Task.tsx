import React, { useState } from "react";
import "./Task.css";
import { isContext } from "vm";
interface TaskTypes {
  id: Number;
  task: any;
  onTaskDelete: () => void;
  onTaskEdit: () => void;
  handleCheckBox: (task: object) => void;
}
const Task = ({
  id,
  task,
  onTaskDelete,
  onTaskEdit,
  handleCheckBox,
}: TaskTypes) => {
  return (
    <div className="task">
      <div className="taskContainer">
        <div className="taskDiv-1">
          <input
            type="checkBox"
            checked={task.isChecked}
            onChange={() => handleCheckBox(task)}
          />
          <label
            id={`taskNumber-${id}`}
            style={{
              textDecoration: task.isChecked ? "line-through" : "none",
              color: task.isChecked ? "#8e8e8e" : "black", // Ensure "black" is a string
            }}
          >
            {task.message}
          </label>
        </div>
        <div className="taskDiv-2">
          <img
            src="/Icons/edit.png"
            alt="editIcon"
            onClick={() => onTaskEdit()}
          />
          <img
            src="/Icons/deleteTask.png"
            alt="deleteIcon"
            id={`taskDeleteButton-${id}`}
            onClick={() => onTaskDelete()}
          />
        </div>
      </div>
      <div className="taskBorder"></div>
    </div>
  );
};

export default Task;
