
const STORAGE_KEY = "alexMorganAcademicTasks";
const taskForm = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");
const taskFilter = document.querySelector("#task-filter");
const storageMessage = document.querySelector("#storage-message");
const taskFormMessage = document.querySelector("#task-form-message");
const deleteDialog = document.querySelector("#delete-dialog");
const confirmDeleteButton = document.querySelector("#confirm-delete");
const cancelDeleteButton = document.querySelector("#cancel-delete");
let tasks = loadTasks();
let taskToDeleteId = null;
let deleteTrigger = null;

function isValidDateString(dateString) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;
  const date = new Date(`${dateString}T00:00:00`);
  return !Number.isNaN(date.getTime()) &&
    date.getFullYear() === Number(dateString.slice(0, 4)) &&
    date.getMonth() + 1 === Number(dateString.slice(5, 7)) &&
    date.getDate() === Number(dateString.slice(8, 10));
}

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks === null) return [];

    const parsedTasks = JSON.parse(savedTasks);
    const validTasks = Array.isArray(parsedTasks) && parsedTasks.every((task) =>
      task && typeof task.id === "string" &&
      typeof task.title === "string" && task.title.trim().length > 0 && task.title.length <= 120 &&
      typeof task.course === "string" && task.course.trim().length > 0 && task.course.length <= 80 &&
      typeof task.dueDate === "string" && isValidDateString(task.dueDate) &&
      ["low", "medium", "high"].includes(task.priority) &&
      typeof task.completed === "boolean"
    );

    if (!validTasks) throw new Error("Saved task data has an unexpected format.");
    return parsedTasks;
  } catch (error) {
    storageMessage.hidden = false;
    storageMessage.textContent = "Saved task data could not be read. The planner will start with an empty list. You can still add new tasks.";
    console.error("Could not load academic planner tasks:", error);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    storageMessage.hidden = true;
  } catch (error) {
    storageMessage.hidden = false;
    storageMessage.textContent = "Your changes are visible, but could not be saved in this browser. Check your browser storage settings.";
    console.error("Could not save academic planner tasks:", error);
  }
}

function updateStatistics() {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const completionRate = tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);
  document.querySelector("#total-count").textContent = String(tasks.length);
  document.querySelector("#pending-count").textContent = String(pendingTasks);
  document.querySelector("#completed-count").textContent = String(completedTasks);
  document.querySelector("#completion-rate").textContent = `${completionRate}%`;
  document.querySelector("#progress-label").textContent = `${completedTasks} of ${tasks.length} tasks complete`;
  document.querySelector("#progress-track").setAttribute("aria-valuenow", String(completionRate));
  document.querySelector("#progress-fill").style.width = `${completionRate}%`;
}

function formatDueDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function renderTasks() {
  taskList.replaceChildren();
  const filter = taskFilter.value;
  const visibleTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  }).sort((first, second) => first.dueDate.localeCompare(second.dueDate));

  document.querySelector("#visible-task-count").textContent = `${visibleTasks.length} ${visibleTasks.length === 1 ? "task" : "tasks"}`;

  if (visibleTasks.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    const heading = document.createElement("h3");
    const message = document.createElement("p");
    if (tasks.length === 0) {
      heading.textContent = "Your planner is ready.";
      message.textContent = "Add your first academic task using the form. It will appear here.";
    } else {
      heading.textContent = `No ${filter} tasks right now.`;
      message.textContent = "Choose another filter or add a new task to your list.";
    }
    emptyState.append(heading, message);
    taskList.append(emptyState);
    updateStatistics();
    return;
  }

  visibleTasks.forEach((task) => {
    const card = document.createElement("article");
    card.className = `task-card${task.completed ? " is-complete" : ""}`;
    const check = document.createElement("input");
    check.className = "task-check";
    check.type = "checkbox";
    check.checked = task.completed;
    check.setAttribute("aria-label", `${task.completed ? "Mark as pending" : "Mark as completed"}: ${task.title}`);
    check.addEventListener("change", () => toggleTask(task.id));

    const details = document.createElement("div");
    details.className = "task-details";
    const title = document.createElement("h3");
    title.textContent = task.title;
    const meta = document.createElement("p");
    meta.textContent = `${task.course} · Due ${formatDueDate(task.dueDate)}`;
    details.append(title, meta);

    const priority = document.createElement("span");
    priority.className = `priority priority-${task.priority}`;
    priority.textContent = `${task.priority} priority`;
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-task";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete task: ${task.title}`);
    deleteButton.addEventListener("click", () => openDeleteDialog(task.id, deleteButton));

    const rightSide = document.createElement("div");
    rightSide.className = "task-actions";
    rightSide.append(priority, deleteButton);
    card.append(check, details, rightSide);
    taskList.append(card);
  });
  updateStatistics();
}

function clearTaskErrors() {
  ["title", "course", "date"].forEach((field) => {
    document.querySelector(`#${field === "date" ? "task-due-date" : `task-${field}`}`).removeAttribute("aria-invalid");
    document.querySelector(`#${field}-error`).textContent = "";
  });
}

function showTaskError(field, message) {
  const inputId = field === "date" ? "task-due-date" : `task-${field}`;
  document.querySelector(`#${inputId}`).setAttribute("aria-invalid", "true");
  document.querySelector(`#${field}-error`).textContent = message;
}

function addTask(event) {
  event.preventDefault();
  clearTaskErrors();
  taskFormMessage.textContent = "";
  const title = document.querySelector("#task-title").value.trim();
  const course = document.querySelector("#task-course").value.trim();
  const dueDate = document.querySelector("#task-due-date").value;
  let isValid = true;

  if (!title) {
    showTaskError("title", "Enter a title for this task.");
    isValid = false;
  } else if (title.length > 120) {
    showTaskError("title", "Keep the title to 120 characters or fewer.");
    isValid = false;
  }
  if (!course) {
    showTaskError("course", "Enter the course or subject.");
    isValid = false;
  }
  if (!isValidDateString(dueDate)) {
    showTaskError("date", "Choose a valid due date.");
    isValid = false;
  }
  if (!isValid) return;

  tasks.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    course,
    dueDate,
    priority: document.querySelector("#task-priority").value,
    completed: false
  });
  saveTasks();
  taskForm.reset();
  renderTasks();
  taskFormMessage.textContent = "Task added to your planner.";
  showSuccessDialog("#task-success-dialog", "#task-success-close");
}

function showSuccessDialog(dialogSelector, closeButtonSelector) {
  const dialog = document.querySelector(dialogSelector);
  if (!dialog || typeof dialog.showModal !== "function") return;
  const closeButton = dialog.querySelector(closeButtonSelector);
  const close = () => dialog.close();
  closeButton?.addEventListener("click", close, { once: true });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  }, { once: true });
  dialog.showModal();
}

function toggleTask(taskId) {
  tasks = tasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task);
  saveTasks();
  renderTasks();
}

function openDeleteDialog(taskId, trigger) {
  taskToDeleteId = taskId;
  deleteTrigger = trigger;
  deleteDialog.showModal();
}

function deleteTask() {
  if (!taskToDeleteId || !tasks.some((task) => task.id === taskToDeleteId)) {
    deleteDialog.close();
    return;
  }
  tasks = tasks.filter((task) => task.id !== taskToDeleteId);
  saveTasks();
  renderTasks();
  deleteDialog.close("delete");
  showSuccessDialog("#task-deleted-dialog", "#task-deleted-close");
}

taskForm.addEventListener("submit", addTask);
taskFilter.addEventListener("change", renderTasks);
confirmDeleteButton.addEventListener("click", deleteTask);
cancelDeleteButton.addEventListener("click", () => deleteDialog.close("cancel"));
deleteDialog.addEventListener("close", () => {
  const shouldRestoreFocus = deleteDialog.returnValue !== "delete";
  taskToDeleteId = null;
  if (shouldRestoreFocus && deleteTrigger?.isConnected) deleteTrigger.focus();
  deleteTrigger = null;
});
taskForm.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    const errorField = input.id === "task-due-date" ? "date" : input.name;
    document.querySelector(`#${errorField}-error`).textContent = "";
  });
});
renderTasks();
