let ul = document.querySelector('.body-tasks-container')
let editBtn
let deleteBtn 
const confirmBlock = document.querySelector('.edit-place-block')
const clearAllBtn = document.querySelector('.todoapp-clear-btn-container')
const confirmBtn = document.querySelector('.insert-place-btn__confirm')
const cancelBtn = document.querySelector('.insert-place-btn__cancel')
const inputBtn = document.querySelector('.insert-place-btn')
let numTask = document.querySelector('.num-tasks')
let input = document.querySelector('.insert-place__input_content')
const api = 'http://localhost:3000/api'
function getAPI(callback){
fetch(api)
.then(res =>res.json())
.then(data => 
  // console.log(data)
  callback(data)
  )
}
getAPI(getdata)

let listTask

function getdata(data){
  render(data)
}

function render(data){
  html= data.map(value =>{
    return`<li id="${value._id}" class="body-task-item">
    <span class="body-task-item__value">${value.task}</span>
    <span class="body-task-btn-container">
    <span class="body-task-item__btn-delete"><i class="fas fa-trash-alt"></i></span>
    <span class="body-task-item__btn-change"><i class="fas fa-pencil-alt"></i></span>
    </span>
    </li>`
  })
  let sumData = data.length
  numTask.innerText = sumData
  ul.innerHTML=html.join('')
  getBtn()
  deleteTask()
  edit()
}


// declare method work with db
async function postData(url, data = {}) {
 const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}


async function deleteData(url, data) {
  const response = await fetch(url, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function updateData(url, data) {
  const response = await fetch(url, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function deleteAll(url, data) {
  const response = await fetch(url, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// add data

inputBtn.onclick = function(){
  validate()
  input.value=''
}

function validate(){
  let inputTask = input.value.trim()
  if (inputTask==''){
    alert('Please enter your task')
  }else{
    postData(api, { task: inputTask })
    .then(data => render(data))
  }
}

//delete and edit data
function getBtn(){
   deleteBtn = Array.from(document.querySelectorAll('.body-task-item__btn-delete'))
  editBtn = Array.from(document.querySelectorAll('.body-task-item__btn-change'))
}

function deleteTask(){
  deleteBtn.forEach(function(btn){
    btn.onclick = function(){
      let idTask = btn.parentElement.parentElement.id
      deleteData(api, {idTask})
    .then(data => render(data))
    }

  })
}


function edit(){
  editBtn.forEach((btn)=>{

    btn.onclick = function(){
      let editLi = btn.parentElement.parentElement
      let editId = btn.parentElement.parentElement.id
      let value = editLi.children[0].innerText
      input.value = value
      confirmBlock.style.display='flex'
      inputBtn.style.display='none'
      updateEdit(editId)
  }
  })}

//send update value to db
  function updateEdit(id){
    confirmBtn.onclick = function(){
      updateData(api, {id:id,task:input.value})
      .then(data =>{render(data);})
      confirmBlock.style.display='none'
      inputBtn.style.display='block'
      input.value=''
    }
    
    cancelBtn.onclick=function(){ 
      confirmBlock.style.display='none'
      inputBtn.style.display='block'
    }
    }
    

  clearAllBtn.onclick = () =>{
    deleteAll(api + '/'+'deleteAll',{task:''})
    .then(data =>{render(data);})

  }

  
