let tasks = new TaskManager;

tasks.load();
tasks.render();

const newTaskNameInput = document.querySelector("#taskName");
const newTaskDescriptionInput = document.querySelector("#taskDescription");
const newAssignedInput = document.querySelector("#assignedTo");
const newDueDateInput = document.querySelector("#dueDate");

const validFormFieldInput = (e) => {
	e.preventDefault();
	const name = newTaskNameInput.value;
	const taskDescription = newTaskDescriptionInput.value;
	const assignedTo = newAssignedInput.value;
	const dueDate = newDueDateInput.value;

	console.log("Name:  " + name);
	console.log("taskDescription:  " + taskDescription);
	console.log("assignedTo:  " + assignedTo);
	console.log("dueDate:  " + dueDate);

	tasks.addTask(name, taskDescription, assignedTo, dueDate);
	tasks.render();
	tasks.save();

	document.getElementById("myForm").reset();
};

document.getElementById("btnAddTask").addEventListener("click", function() {
	const name = newTaskNameInput.value;
	const taskDescription = newTaskDescriptionInput.value;
	const assignedTo = newAssignedInput.value;
	const dueDate = newDueDateInput.value;

	if (name === "") {
		document.getElementById("error").innerHTML = `<div id="error" class="alert alert-primary" role="alert">
	Please input name field!
  </div>`;
	} else if (taskDescription === "") {
		document.getElementById("error").innerHTML = `<div id="error" class="alert alert-primary" role="alert">
	Please input description field!
  </div>`;
	} else if (assignedTo === "") {
		document.getElementById("error").innerHTML = `<div id="error" class="alert alert-primary" role="alert">
	Please input assigned field!
  </div>`;
	} else if (dueDate === "") {
		document.getElementById("error").innerHTML = `<div id="error" class="alert alert-primary" role="alert">
Please input the Due Date field!
</div>`;
	} else {
		document.getElementById("error").innerHTML = ``;
	}
});

// Event listener for mark as done button.

const taskList = document.querySelector("#displayCard2");

taskList.addEventListener("click", (event) => {
	if (event.target.classList.contains("btnMarkAsDone")) {
		let parentTask = event.target.parentNode.parentNode.parentNode;
        let taskId = parseInt(parentTask.getAttribute("data-task-id"));
        let task = tasks.getTaskById(taskId);
        task.status = 'Done';

		if (task.status === 'Done') {
            event.target.classList.remove('visible');
            event.target.classList.add('invisible');
        } 

		tasks.render();
        tasks.save();
	}

	if (event.target.classList.contains("btnDelete")) {
		let parentTask = event.target.parentNode.parentNode.parentNode.parentNode;
		let taskId = parseInt(parentTask.getAttribute("data-task-id"));
		document.getElementById("taskList").innerHTML = "";
		tasks.deleteTask(taskId)
		tasks.save()
		tasks.render()
	}
});
