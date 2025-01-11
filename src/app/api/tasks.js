//Get Data
const Url = "http://13.233.101.66:4000/api/tasks/";
export async function fetchTaskData(posts) {
  try {
    console.log("Inside Get Api");
    const response = await fetch(`${Url}`);
    //data we reveive is in json that the format computer use to communicate on internet
    //Thats why we are converting it to js using .json()
    if (!response.ok) {
      console.log("Problem");
      return;
    }
    const data = await response.json();
    console.log("GET DATA :", data);
    return data;
  } catch (error) {
    console.log("🚀 ~Error fetch data. ~ error:", error);
  }
}

//Post Data
export async function postTaskData(message) {
  console.log("Inside Post function");
  return await fetch(`${Url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message, isChecked: false }),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log("🚀 ~ PostTaskData ~ Response:", data);
      console.log("🚀 ~ .then ~ data:", data.isSuccess);
      return data;
    })
    .catch((error) => {
      console.log("🚀 ~ PostTaskData ~ error:", error);
    });
}

//Put Data
export async function putTaskData(taskObj, message) {
  console.log("Inside Put function", `${Url}${taskObj._id}`, taskObj);
  return await fetch(`${Url}${taskObj._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: taskObj?.message,
      isChecked: taskObj?.isChecked,
    }),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log("🚀 ~ PutTaskData ~ Response:", data);
      console.log("🚀 ~ .then ~ data:", data.isSuccess);
      return data;
    })
    .catch((error) => {
      console.log("🚀 ~ PutTaskData ~ error:", error);
    });
}

//Delete Data
export async function deleteTaskData(id) {
  console.log("Inside Put function", `${Url}${id}`);
  return await fetch(`${Url}${id}`, {
    method: "DELETE",
  })
    .then(async (res) => {
      const data = await res.json();
      console.log("🚀 ~ PutTaskData ~ Response:", data);
      console.log("🚀 ~ .then ~ data:", data.isSuccess);
      return data;
    })
    .catch((error) => {
      console.log("🚀 ~ PutTaskData ~ error:", error);
    });
}
