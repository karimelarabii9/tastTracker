let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById("list-container");
let button = document.querySelector("button");
window.onload = function () {
  listContainer.innerHTML = localStorage.getItem("data");
};
inputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (inputBox.value === "") {
      alert("You must write atleast one task");
    } else {
      addTasks();
    }
  }
});
button.onclick = function () {
  if (inputBox.value === "") {
    alert("You must write atleast one task");
  } else {
    addTasks();
  }
};

listContainer.addEventListener("click", function (event) {
  /** @type {HTMLInputElement} */
  let e = event.target;
  if (e.className === "bx bxs-trash") {
    e.parentElement.remove();
  } else if (e.tagName === "LI") {
    e.classList.toggle("checked");
  } else if (e.className === "bx bxs-edit") {
    editTasks(e);
  }
  saveTask();
});

function saveTask() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function addTasks() {
  let li = document.createElement("li");
  li.textContent = inputBox.value;
  listContainer.appendChild(li);
  let icon = document.createElement("i");
  icon.className = "bx bxs-trash";
  let icon2 = document.createElement("i");
  icon2.className = "bx bxs-edit";
  li.appendChild(icon2);
  li.appendChild(icon);
  saveTask();
  inputBox.value = ""; // clear input field after adding task to the list
}
function editTasks(event) {
  let li = event.parentElement;
  let input = document.createElement("input");
  input.type = "text";
  input.value = li.textContent;
  li.firstChild.replaceWith(input);
  input.focus();
  input.style.padding = "0";
  input.style.margin = "0";
  input.addEventListener("blur", function () {
    let updatedText = input.value;
    if (updatedText === "") {
      li.remove();
    }
    li.firstChild.replaceWith(updatedText);
    saveTask();
  });
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let updatedText = input.value;
      if (updatedText === "") {
        li.remove();
      }
      li.firstChild.replaceWith(updatedText);
      saveTask();
    }
  });
}
