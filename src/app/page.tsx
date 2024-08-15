"use client";
import Image from "next/image";
import "./page.css";
import Task from "./Components/Task/Task";
import { useState } from "react";
import Newtaskpopup from "./Components/New_tsk_popup/Newtaskpopup";
import EditPopup from "./Components/EditPopup/EditPopup";
export default function Home() {
  console.log("ali hamza");
  // For unique id.
  function generateUniqueId(prefix = "") {
    const randomPart = Math.random().toString(36).substring(2, 10);
    const timestampPart = Date.now().toString(36);
    return `${prefix}${randomPart}${timestampPart}`;
  }
  const data = [
    {
      task: "this task 1",
      isChecked: false,
      id: generateUniqueId(),
    },
    {
      task: "this task 2",
      isChecked: false,
      id: generateUniqueId(),
    },
    {
      task: "this task 3",
      isChecked: false,
      id: generateUniqueId(),
    },
  ];
  let taskBackup = data;
  const [task, setTask] = useState(taskBackup); // For tasks
  const [editTaskPopup, setEditTaskPopup] = useState(false); // For edit task Popup
  const [editIndex, setEditIndex] = useState<any | null>(null); // Task index to edit
  const [editInputValue, setEditInputValue] = useState("");
  const [newTaskPopup, setNewTaskPopup] = useState(false); // For new task popup
  function handleOnClickAllTasks() {
    setTask(taskBackup);
  }
  function handleOnClickCompletedTasks() {
    console.log("Inside Completed function");
    var completedTasks = task.filter((item) =>
      item.isChecked == false ? null : true
    );
    setTask(completedTasks);
  }
  function handleOnClickIncompletedTasks() {
    console.log("Inside Incompleted function");
    var inCompletedTasks = task.filter((item) =>
      item.isChecked == true ? null : true
    );
    setTask(inCompletedTasks);
  }
  function handleOnTaskDelete(index) {
    var filterTask = task.filter((task, i) => index != i);
    setTask(filterTask);
  }
  function handleOnTaskEdit(editIndex, editTaskValue) {
    var editTasks = task.map((item, index) => {
      if (index == editIndex) {
        item.task = editTaskValue;
        return item;
      } else {
        return item;
      }
    });
    setTask(editTasks);
    setEditTaskPopup(!editTaskPopup);
  }
  function handleNewTaskApply(newTask) {
    var newTaskObj = {
      task: newTask,
      isChecked: false,
      id: generateUniqueId,
    };
    // var tempArray = task.filter((item) => item ? true : null)
    task.push(newTaskObj);
    setTask(task);
    setNewTaskPopup(!newTaskPopup);
    taskBackup = task;
  }
  function handleSearchTask(searchInput) {
    if (searchInput != "") {
      console.log("search input value", searchInput);
      var filterTasks = task.filter((item) =>
        item.task.includes(searchInput) ? true : false
      );
      setTask(filterTasks);
    } else {
      setTask(taskBackup);
    }
  }
  // Debugging editIndex value
  useState(() => {
    if (editIndex != null) console.log("edit index value: ", editIndex);
  }, [editIndex]);
  return (
    <div className="mainPageContainer">
      <div className="mainContainer">
        <header className="header">
          <h1 className="mainHeading">TODO LIST</h1>
          <div className="header-1">
            <div className="sarchContainer">
              <input
                type="text"
                id="searchInput"
                placeholder="Search note..."
                onChange={(e) => {
                  handleSearchTask(e.target.value);
                }}
              ></input>
              <img className="searchButtonIcon" src="/Icons/search.png" />
            </div>
            <div className="dropDownMain">
              <div className="dropDownButton">
                <p>All</p>
                <img src="/Icons/dropdown.png" />
              </div>
              <div className="dropDownButtonContainer">
                <button
                  className="allTaskButton"
                  onClick={() => handleOnClickAllTasks()}
                >
                  All
                </button>
                <button
                  className="allTaskButton"
                  onClick={() => handleOnClickCompletedTasks()}
                >
                  Completed
                </button>
                <button
                  className="allTaskButton"
                  onClick={() => handleOnClickIncompletedTasks()}
                >
                  Incomplete
                </button>
              </div>
            </div>
            <div className="themeContainer">
              <img src="/Icons/theme.png" />
            </div>
          </div>
        </header>

        <div className="mainBody">
          {task.length == 0 && (
            <img src="/Icons/noTask.png" className="taskDetective" />
          )}
          {task.map((item, index) => (
            <Task
              key={index}
              index={index}
              task={item}
              handleCheckBox={(taskObj) => {
                console.log("taskObj :", taskObj);
                // taskObj.isChecked = !taskObj.isChecked;
                // task[index] = taskObj;
                // let updateTasks = task;
                // console.log("update Tasks array : ", updateTasks);
                // setTask(updateTasks);
                const updateTasks = task.map((item) => {
                  if (item.id == taskObj.id) {
                    taskObj.isChecked = !taskObj.isChecked;
                    return taskObj;
                  } else {
                    return item;
                  }
                });
                console.log("Update Tasks array:", updateTasks);
                setTask(updateTasks);
                taskBackup = updateTasks;
                console.log("taskBackup", taskBackup);
              }}
              onTaskEdit={() => {
                console.log("task edit clicked");
                setEditTaskPopup(!editTaskPopup);
                setEditInputValue(item.task);
                console.log("task input value", item);
                setEditIndex(index);
                console.log("Edit index : ", editIndex);
              }}
              onTaskDelete={() => {
                console.log("tsk delete pressed");
                handleOnTaskDelete(index);
              }}
            />
          ))}
        </div>
        {/* New Task button */}
        <div
          className="addTaskButton"
          onClick={() => {
            console.log("new task button clicked");
            setNewTaskPopup(!newTaskPopup);
          }}
        >
          <img src="/Icons/addTask.png" />
        </div>
      </div>
      {editTaskPopup == false ? null : (
        <EditPopup
          editInputValue={editInputValue}
          editIndex={editIndex}
          editTaskPopupCancel={() => setEditTaskPopup(!editTaskPopup)}
          editTaskPopupApply={(editIndex, editTaskValue) =>
            handleOnTaskEdit(editIndex, editTaskValue)
          }
        />
      )}
      {newTaskPopup == false ? null : (
        <Newtaskpopup
          onNewTaskPopupCancel={() => setNewTaskPopup(!newTaskPopup)}
          onNewTaskPopupApply={(newTask) => handleNewTaskApply(newTask)}
        />
      )}
    </div>
  );
}
