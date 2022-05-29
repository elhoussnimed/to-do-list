const text = document.querySelector("#text");
const add = document.querySelector("#add");
const tasks = document.querySelector("#tasks");
const clear = document.querySelector("#clear");
let array = new Array();

getElementLSToBody();

add.addEventListener("click", () => {
  let taskText = text.value;
  array.push(taskText);
  localStorage.setItem("task", JSON.stringify(array));
  // Create And Append Elements
  let div = document.createElement("div");
  div.classList.add("task");
  div.addEventListener("click", () => {
    div.classList.toggle("task-check");
  });
  let p = document.createElement("p");
  let btn = document.createElement("button");
  btn.append("delete");
  p.append(taskText);
  div.append(p, btn);
  tasks.append(div);
  text.value = "";
  console.log(tasks.children[0]);
  deletItemFromLS(array, btn);
});

function deletItemFromLS(array, btn) {
  btn.addEventListener("click", () => {
    array = JSON.parse(localStorage.getItem("task"));
    let index = array.indexOf(btn.parentElement.children[0].textContent);
    array.splice(index, 1);
    btn.parentElement.style.cssText = "pointer-events: none";
    btn.parentElement.remove();
    localStorage.setItem("task", JSON.stringify(array));
  });
}

function getElementLSToBody() {
  if (localStorage.getItem("task")) {
    array = JSON.parse(localStorage.getItem("task"));
    array.forEach((e) => {
      // Create And Append Elements
      let div = document.createElement("div");
      div.classList.add("task");
      div.addEventListener("click", () => {
        div.classList.toggle("task-check");
      });
      let p = document.createElement("p");
      let btn = document.createElement("button");
      btn.append("delete");
      p.append(e);
      div.append(p, btn);
      tasks.append(div);
      text.value = "";
      deletItemFromLS(array, btn);
    });
  } else {
    array = [];
  }
}

function clearAllData() {
  clear.addEventListener("click", () => {
    localStorage.clear();
    tasks.innerHTML = "";
  });
}
clearAllData();
