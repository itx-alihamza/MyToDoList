import React, { useState } from "react";
import "./Newtaskpopup.css";
interface NewtaskPopTypes {
  onNewTaskPopupCancel: () => void;
  onNewTaskPopupApply: () => void;
}
const Newtaskpopup = ({
  onNewTaskPopupCancel,
  onNewTaskPopupApply,
}: NewtaskPopTypes) => {
  const [newTask, setNewTask] = useState("");
  return (
    <div className="newTPMain">
      <div className="newTP">
        <div className="newTP-1">
          <h1 className="newTPHeading">NEW NOTE</h1>
          <input
            type="text"
            placeholder="Input your note..."
            id="newTaskInputField"
            onChange={(e) => {
              console.log("Event:", e);
              setNewTask(e.target.value);
            }}
          />
        </div>
        <div className="newTP-2">
          <button className="newTPCancelButton" onClick={onNewTaskPopupCancel}>
            CANCEL
          </button>
          <button
            className="newTPApplyButton"
            onClick={() => onNewTaskPopupApply(newTask)}
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newtaskpopup;
