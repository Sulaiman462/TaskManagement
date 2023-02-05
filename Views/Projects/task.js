var globalObject = {};
let projectList = [];
let arr =[] 
let taskID


window.addEventListener('DOMContentLoaded',(()=>{
    let token = localStorage.getItem('token');

    async function get(){
 
    await axios.get("http://localhost:3000/getProjects" , {headers:{"Authorisation" : token}})

    .then((res)=>{
        if(res.status == 200){
            console.log("GOT  FROM  DATABASE");
            console.log(res.data.response)
            console.log(arr,"vvv")
            // dispProjects(res.data.response,arr);
            arr= res.data.response
            taskID = res.data.response[0]._id

        }
    })
    await axios.get(`http://localhost:3000/getTasks/${taskID}`)

    .then((res)=>{
        if(res.status == 200){
            console.log("GOT  FROM  DATABASE TASKS");
            console.log(res.data.response)
            dispProjects(arr,res.data.response);
            // arr= res.data.response

        }
    })


    }
    get()

}))
function dispProjects(data,arr) {
    let projectContainer = document.getElementById("projectContainer");
    projectContainer.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      let project = data[i];
      let projectDiv = document.createElement("div");
      projectDiv.classList.add("project");
      projectDiv.innerHTML =
        "<div class='project-header'>" +
        project.projectName +
        "</div><div>Project Description: " +
        project.projectDescription +
        "</div><div>Project Status: " +
        project.projectStatus +
        "</div><br><b>Tasks:</b><br>";
      for (let j = 0; j < arr.length; j++) {
        let task = arr[j];
        projectDiv.innerHTML +=
          "<div class='task' id='Task'>Task Name: " +
          task.taskName +
          " Task Description: " +
          task.taskDescription +
          " Task Status: " +
          task.taskStatus +
          "</div>";
      }
  
      projectDiv.innerHTML +=
        `<button class='add-task-btn' onclick='addTask(${i})'>Add Task</button><br><br>`;
      projectContainer.appendChild(projectDiv);
    }
  }


  

function addProject() {
        let token = localStorage.getItem('token');

  let projectName = document.getElementById("projectName").value;
  let projectDesc = document.getElementById("projectDesc").value;
  let projectStatus = document.getElementById("projectStatus").value;
  let project = { name: projectName, desc: projectDesc, status: projectStatus, tasks: [] };
  let obj = {
            projectName:projectName,
            projectDes:projectDesc,
            projectStatus:projectStatus
        }
  axios.post('http://localhost:3000/addProjects' ,obj, {headers:{"Authorisation" : token}}).then((res)=>{

    if(res.status == 201){
        alert(' Sucessfull')
        console.log(res.data.NewProject,"OPPPO")
    }
    globalObject.ProID =res.data.NewProject._id
    }).catch(err=>{
        console.log(err)
    })
  projectList.push(project);
  displayProjects();
}

function addTask(projectIndex) {
  let taskName = prompt("Enter task name");
  let taskDesc = prompt("Enter task description");
  let taskStatus = prompt("Enter task status (progress, pending, done)");
  let task = { name: taskName, desc: taskDesc, status: taskStatus };
  projectList[projectIndex].tasks.push(task);
  let ProjectId = globalObject.ProID
let object= {
    Id:ProjectId,
    name:taskName,
    des :taskDesc,
    status: taskStatus

}
console.log(object)

  axios.post("http://localhost:3000/addTasks",object)
      .then((response)=>{
          console.log(response)
          alert("task added successfully")
      })
      .catch((error)=>{
          console.log(error)
      })
      displayProjects();
}



function displayProjects() {
  let projectContainer = document.getElementById("projectContainer");
  projectContainer.innerHTML = "";
  for (let i = 0; i < projectList.length; i++) {
    let project = projectList[i];
    let projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.innerHTML =
      "<div class='project-header'>" +
      project.name +
      "</div><div>Project Description: " +
      project.desc +
      "</div><div>Project Status: " +
      project.status +
      "</div><br><b>Tasks:</b><br>";
    for (let j = 0; j < project.tasks.length; j++) {
      let task = project.tasks[j];
      projectDiv.innerHTML +=
        "<div class='task'>Task Name: " +
        task.name +
        " Task Description: " +
        task.desc +
        " Task Status: " +
        task.status +
        "</div>";
    }

    projectDiv.innerHTML +=
      `<button class='add-task-btn' onclick='addTask(${i})'>Add Task</button><br><br>`;
    projectContainer.appendChild(projectDiv);
  }
}
