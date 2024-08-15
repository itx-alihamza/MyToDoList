import React, { useState } from "react";

interface EditTaskPopup {
  editTaskPopupApply: (editIndex: number, editTaskValue: string) => void;
  editTaskPopupCancel: () => void;
  editInputValue: any;
  editIndex: number;
}
const EditPopup = ({
  editTaskPopupApply,
  editTaskPopupCancel,
  editInputValue,
  editIndex,
}: EditTaskPopup) => {
  const [editTaskValue, setEditTaskValue] = useState(editInputValue);
  return (
    <div className="newTPMain">
      <div className="newTP">
        <div className="newTP-1">
          <h1 className="newTPHeading">EDIT NOTE</h1>
          {/* Input Field */}
          <input
            value={editTaskValue}
            type="text"
            placeholder="Input your note..."
            id="editTaskInputField"
            onChange={(e) => {
              console.log(e.target.value);
              setEditTaskValue(e.target.value);
            }}
          />
        </div>
        <div className="newTP-2">
          {/* Cancel Button */}
          <button
            className="newTPCancelButton"
            onClick={() => editTaskPopupCancel()}
          >
            CANCEL
          </button>
          {/* Apply Button */}
          <button
            className="newTPApplyButton"
            onClick={() => {
              console.log("edit task value:", editTaskValue);
              editTaskPopupApply(editIndex, editTaskValue);
            }}
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
