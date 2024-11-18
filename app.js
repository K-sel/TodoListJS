"use strict";

//---Globals---

//Stocking the input for readability
const inputTodo = document.getElementById("input-todo");

//By default, accroding to the HTML home category is selected
let selectedCategory = "home";

//---Events Listening---

//Event listening for adding tasks
document.addEventListener("keyup", (e) => enterReleased(e));

//Event listing for managing Done/Todo State of tasks
document.body.addEventListener("click", (e) => stateManager(e));

//Event listening for removing tasks
document.body.addEventListener("click", (e) => deleteTask(e));

//Event listening for tasks category
document
  .querySelector("div#category-container")
  .addEventListener("click", (e) => categorySelector(e));

//---Functions---

//Function that allows to switch from tasks categories
const categorySelector = (e) => {
  if (e.target.classList.contains("category")) {
    //Getting all the categories in a array
    let parent = [...e.target.parentElement.children];

    //Turning all the categories false
    parent.forEach((e) => (e.dataset.selected = "false"));

    //Truning the selected category true
    e.target.dataset.selected = "true";

    //Retruning the categroy value
    selectedCategory = e.target.dataset.category;
  }
};

//Function that detects and executes addTask() when enter key is released
const enterReleased = (e) => {
  //using the keyboard code to detect if enter has been released.
  if (e.code === "Enter" && inputTodo.value) {
    //adding the task
    addTask(inputTodo);
  }
};

//Function that switches done/todo state of a task
const stateManager = (e) => {
  e.target.dataset.done =
    e.target.tagName === "LI" && e.target.dataset.done === "false"
      ? true
      : false;
};

//Function that executes the removing of a task from the list
const deleteTask = (e) => {
  //Checking by event delegation if the delete button has been clicked
  if (e.target.classList.contains("button-done")) {
    //deleting target's parent, so in this case the whole <li> ele
    e.target.parentElement.remove();
  }
};

//Function that exectutes the adding of a task
const addTask = (inputTodo) => {
  /*
  trimming value for space optimisation 
  and so the boolean state will be false if its empty  
  */
  let value = inputTodo.value.trim();

  //Making sure that we cannot insert a empty task
  if (value) {
    //Adding HTML with input value as task name
    let html = `<li data-category=${selectedCategory} data-done="false"> 
    ${value}
    <div class="button-done">❌</div>
        </li>`;

    //Inserting custom <li> element on top of the list
    document.querySelector("ul#list").insertAdjacentHTML("afterbegin", html);

    //Cleaning input and removing focus
    inputTodo.blur();
    inputTodo.value = "";
  }
};
