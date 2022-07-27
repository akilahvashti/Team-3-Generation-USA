
const createTaskHtml = (Name, taskDescription, assignedTo, dueDate, status, id) => {
	let doneButtonVisibility = "visible";
	if (status === "Done") {
		doneButtonVisibility = "invisible";
	}

	return `        <li id="displayCard2" class="list-group-item" data-task-id = "${id}">
		<div class="card-body" id="data-task-id">
		  <div class="alignment">
		    <p class="card-text" id="title"><span class="fw-bold">Task Name:</span> ${Name}</p>
			<button type="button" class="markDOM btn btn-secondary done-button btnMarkAsDone ${doneButtonVisibility}">Mark as done</button>
			</div>
		  <p class="card-text"><span class="fw-bold">Task Description:</span> ${taskDescription}</p>
		  <p class="card-text"><span class="fw-bold">Assigned to:</span> ${assignedTo}</p>
		  <p class="card-text"><span class="fw-bold">Due Date:</span> ${dueDate}</p>
		  <div class="alignment">
		  <p class="card-text"><span class="fw-bold">Status:</span> ${status}</p>
		  <div class="move">
		      <button type="button" class="btn btn-danger delete-button btnDelete">Delete</button>
		  </div>
		</div>
	  </div>
</li>`;
};

// create TaskManager class
class TaskManager {
	constructor(tasks, currentId) {
		this._tasks = [];  // empty array for tasks
		this._currentId = 0;  // sets current ID to 0
	}

	// add unique ID and data to tasks item
	addTask(Name, taskDescription, assignedTo, dueDate, status = "ToDo") {
		this._currentId++;
		const newTask = {
			id: this._currentId,
			Name,
			taskDescription,
			assignedTo,
			dueDate,
			status
		};
		this._tasks.push(newTask);
	}

	// add new task to right display card of page
	render() {
		const taskHtmlList = [];

		// For of loop?
		for (let task of this._tasks) {
			let date = new Date(task.dueDate);
			let formattedDate = date.getMonth() + 1 + "/" + (date.getDate() + 1) + "/" + date.getFullYear();
			const taskHtml = createTaskHtml(
				task.Name,
				task.taskDescription,
				task.assignedTo,
				formattedDate,
				task.status,
				task.id
			);

			taskHtmlList.push(taskHtml);
			const tasksHtml = taskHtmlList.join(""); // join("/n")
			document.getElementById("displayCard2").innerHTML = tasksHtml;
		}
	}

	getTaskById(taskId) {
		let foundTask;

		for (let task of this._tasks) {
			if (task.id == taskId) {
				foundTask = task;
			}
		}
		return foundTask;
	}

	save() {
		const tasksJson = JSON.stringify(this._tasks);
		localStorage.setItem("tasks", tasksJson);

		const currentId = this._currentId.toString();
		localStorage.setItem("currentId", currentId);
	}

	load() {
		if (localStorage.getItem("tasks")) {
			let tasksJson = localStorage.getItem("tasks");
			this._tasks = JSON.parse(tasksJson);
		}

		if (localStorage.getItem("currentId")) {
			let currentId = localStorage.getItem("currentId");
			this._currentId = parseInt(currentId);
		}
	}

	// code behind delete button
	deleteTask(taskId) {
		let newTasks = [];

		for (let i = 0; i < this._tasks.length; i++) {
			let task = this._tasks[i];

			if (task.id !== taskId) {
				newTasks.push(task);
			}
		}
		this._tasks = newTasks;
	}
}

exports.TaskManager = TaskManager;

