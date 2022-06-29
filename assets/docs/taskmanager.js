const createTaskHtml = (name, description, assignedTo, dueDate, status, id) => {
	let doneButtonVisibility = "visible";
	if (status === "Done") {
		doneButtonVisibility = "invisible";
	}

	return `        <li id="taskCard" class="list-group-item" data-task-id = "${id}">
		<div class="card-body" id="data-task-id">
		  <div class="alignment">
		    <p class="card-text" id="title"><span class="fw-bold">Task Name:</span> ${name}</p>
			<button type="button" class="markDOM btn btn-secondary done-button ${doneButtonVisibility}">Mark as done</button>
			</div>
		  <p class="card-text"><span class="fw-bold">Task Description:</span> ${description}</p>
		  <p class="card-text"><span class="fw-bold">Assigned Date:</span> ${assignedTo}</p>
		  <p class="card-text"><span class="fw-bold">Due Date:</span> ${dueDate}</p>
		  <div class="alignment">
		  <p class="card-text"><span class="fw-bold">Status:</span> ${status}</p>
		  <div class="move">
		      <button type="button" class="btn btn-danger delete-button">Delete</button>
		  </div>
		</div>
	  </div>
</li>`;
};

class TaskManager {
	constructor(tasks, currentId) {
		this._tasks = [];
		this._currentId = 0;
	}

	addTask(name, description, assignedTo, dueDate, status = "ToDo") {
		this._currentId++;
		const newTask = {
			id: this._currentId,
			name,
			description,
			assignedTo,
			dueDate,
			status
		};
		this._tasks.push(newTask);
	}

	render() {
		const taskHtmlList = [];

		// For of loop?
		for (let task of this._tasks) {
			let date = new Date(task.dueDate);
			let formattedDate = date.getMonth() + 1 + "/" + (date.getDate() + 1) + "/" + date.getFullYear();
			const taskHtml = createTaskHtml(
				task.name,
				task.description,
				task.assignedTo,
				formattedDate,
				task.status,
				task.id
			);

			taskHtmlList.push(taskHtml);
			const tasksHtml = taskHtmlList.join(""); // join("/n")
			document.getElementById("taskList").innerHTML = tasksHtml;
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