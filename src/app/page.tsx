"use client";
import "./page.css";
import { useEffect, useRef, useState } from "react";
import Newtaskpopup from "./Components/New_tsk_popup/Newtaskpopup";
import EditPopup from "./Components/EditPopup/EditPopup";
import { FetchTask, FetchTasks } from "./utils/types";
import Task from "./Components/Task/Task";
import {
  deleteTaskData,
  fetchTaskData,
  postTaskData,
  putTaskData,
} from "./api/tasks";
import * as loadingAnimation from "../../public/animations/loadingAnimation.json";
import Lottie from "lottie-react";
import { Source_Code_Pro } from "next/font/google";
export default function Home() {
  console.log("ali hamza");
  const [task, setTask] = useState<any>(); // For tasks
  const [editTaskPopup, setEditTaskPopup] = useState(false); // For edit task Popup
  const [editIndex, setEditIndex] = useState<any | null>(null); // Task index to edit
  const [editInputValue, setEditInputValue] = useState<null | object>(null);
  const [newTaskPopup, setNewTaskPopup] = useState<boolean>(false); // For new task popup
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [taskLatest, setTaskLatest] = useState<boolean>(false);
  const firstRender = useRef(true);
  const [filterdTasks, setFilteredTasks] = useState<any>(task);
  const [searchField, setSearchField] = useState<string | any>(""); //Active or not
  const [whileSearchFieldActive, setWhileSearchFieldActive] =
    useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  //For managing filter
  useEffect(() => {
    setFilteredTasks(task);
  }, [task]);

  //handle get data

  //Get All Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const tasks = await fetchTaskData();
        setIsLoading(false);
        console.log("Get data successfully.", tasks);
        setTask(tasks);
        setFilteredTasks(tasks);
        // setFetchTaskData(tasks);
      } catch (error) {
        console.log("🚀 ~ fetchData ~ error:", error);
      }
    };
    fetchData();
    return () => {
      console.log("Unmount");
    };
  }, [taskLatest]);

  //Post Data
  const handlePostData = async (message: string) => {
    console.log("🚀 ~ handlePostData ~ message:", message);
    setIsLoading(true);
    const data = await postTaskData(message); //Api call
    setIsLoading(false);
    console.log("🚀 ~ handlePostData ~ isSuccess:", data);
    if (data.isSuccess) {
      console.log("🚀 ~ handlePostData ~ data.Task:", data.task);
      setTask([data.task, ...task]);
    } else {
      console.log("SOmething went wrong");
    }
  };

  // Put Data
  useEffect(() => {
    if (firstRender) {
      firstRender.current = false;
      return;
    }

    console.log("Selected task :", selectedTask);
    putTaskData(selectedTask);
  }, [selectedTask]);

  async function handleEditTaskApply(editIndex: number, editTaskValue: string) {
    console.log("Inside task edit.");
    let updatedTask = {};
    var editTasks = task.map((item: any, index: number) => {
      if (item._id == selectedTask._id) {
        item.message = editTaskValue;
        updatedTask = item;
        return item;
      } else {
        return item;
      }
    });
    let res = await putTaskData(updatedTask);
    if (res.isSuccess) {
      setTask(editTasks);
    } else {
      alert("Something went wrong.");
    }
    setEditTaskPopup(!editTaskPopup);
  }

  //Delete data.
  async function handleOnTaskDelete(data: any) {
    var filterTask = task.filter(
      (item: any, i: number) => item._id != data._id
    );
    setIsLoading(true);
    const res = await deleteTaskData(data._id);
    setIsLoading(false);
    if (res.isSuccess) {
      setTask(filterTask);
    } else alert("Something went wrong");
  }

  // For unique id.
  function generateUniqueId(prefix = "") {
    const randomPart = Math.random().toString(36).substring(2, 10);
    const timestampPart = Date.now().toString(36);
    return `${prefix}${randomPart}${timestampPart}`;
  }
  function handleFilterTasks(taskFilter: string = "all") {
    console.log("Inside handle filter tasks", taskFilter);
    if (!searchField) {
      const filterTask = task?.filter((item: any) => {
        if (taskFilter == "completed") return item.isChecked;
        else if (taskFilter == "incomplete") return !item.isChecked;
        return true;
      });
      setFilteredTasks(filterTask);
    } else if (searchField) {
      console.log("while search : ", filterdTasks, whileSearchFieldActive);
      const filterData = whileSearchFieldActive?.filter((item: any) => {
        if (taskFilter == "completed") return item.isChecked;
        else if (taskFilter == "incomplete") return !item.isChecked;
        return true;
      });
      console.log("🚀 ~ filterData ~ filterData:", filterData);
      setFilteredTasks(filterData);
    }
  }
  function handleNewTaskApply(newTask: string) {
    // var tempArray = task.filter((item) => item ? true : null)
    // task.push(newTaskObj);
    setTask(task);
    setNewTaskPopup(!newTaskPopup);
  }
  function handleSearchTask(searchInput: string) {
    if (searchInput) {
      console.log("Search Input : ", searchInput);
      var filterTasks = task.filter((item: any) =>
        item.message.includes(searchInput) ? true : false
      );
      console.log("🚀 ~ handleSearchTask ~ filterTasks:", filterTasks);
      setFilteredTasks(filterTasks);
      setWhileSearchFieldActive(filterTasks);
    } else {
      console.log("Search Input : ", searchInput);
      setFilteredTasks(task);
    }
  }

  return (
    <div className="mainPageContainer">
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
                setSearchField(e.target.value);
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
                onClick={() => handleFilterTasks("all")}
              >
                All
              </button>
              <button
                className="allTaskButton"
                onClick={() => handleFilterTasks("completed")}
              >
                Completed
              </button>
              <button
                className="allTaskButton"
                onClick={() => handleFilterTasks("incomplete")}
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
      <div className="mainContainer">
        {isLoading && (
          <div className="z-20 fixed top-0 left-0 bottom-0 right-0 bg-gray-500 bg-transparent content-center">
            <Lottie
              animationData={loadingAnimation}
              loop={true}
              className="h-40 md:h-30 xs:h-20"
            />
          </div>
        )}
        {filterdTasks?.length == 0 && (
          <img src="/Icons/noTask.png" className="taskDetective" />
        )}
        {filterdTasks?.map((item: any, index: number) => (
          <Task
            key={index}
            id={item.id}
            task={item}
            handleCheckBox={async (taskObj: any) => {
              // console.log("🚀 ~ Home ~ taskObj:", taskObj._id);
              let updatedObject = {};
              const updateTasks = task.map((item: any) => {
                if (item._id == taskObj._id) {
                  console.log(
                    "🚀 ~ updateTasks ~ item:",
                    item._id,
                    taskObj._id
                  );
                  taskObj.isChecked = !taskObj.isChecked;
                  updatedObject = taskObj;
                  return taskObj;
                } else {
                  return item;
                }
              });
              const res = await putTaskData(updatedObject);
              if (res.isSuccess) {
                setTask(updateTasks);
              } else {
                alert("something went wrong");
              }
            }}
            onTaskEdit={() => {
              console.log("task edit clicked");
              setSelectedTask(item);
              setEditTaskPopup(!editTaskPopup);
              setEditInputValue(item.message);
              console.log("task input value", item);
              setEditIndex(index);
              console.log("Edit index : ", editIndex);
            }}
            onTaskDelete={() => {
              console.log("tsk delete pressed");
              handleOnTaskDelete(item);
            }}
          />
        ))}
        {/* New Task button */}
        <div
          className="addTaskButton"
          onClick={(e) => {
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
          editTaskPopupApply={(editIndex, editTaskValue) => {
            handleEditTaskApply(editIndex, editTaskValue);
          }}
        />
      )}
      {newTaskPopup == false ? null : (
        <Newtaskpopup
          onNewTaskPopupCancel={() => setNewTaskPopup(!newTaskPopup)}
          onNewTaskPopupApply={(newTask) => {
            handleNewTaskApply(newTask);
            handlePostData(newTask);
          }}
        />
      )}
    </div>
  );
}
