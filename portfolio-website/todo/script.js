let tasks = [];

document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  input.value = "";
  update();
}

function update() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((t, i) => {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = t.text;
    if (t.completed) span.classList.add("completed");

    span.onclick = () => {
      t.completed = !t.completed;
      save();
    };

    let btn = document.createElement("button");
    btn.textContent = "X";
    btn.onclick = () => {
      tasks.splice(i, 1);
      save();
    };

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function save() {
  update();
}

window.onload = () => {
  let data = localStorage.getItem("tasks");
  if (data) tasks = JSON.parse(data);
  update();
};