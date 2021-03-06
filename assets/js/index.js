let tasks = new TaskListManager;

tasks.load();
tasks.render();

const newTaskNameInput = document.getElementById("taskName");
const newTaskDescriptionInput = document.getElementById("taskDescription");
const newAssignedInput = document.getElementById("assignedTo");
const newDueDateInput = document.getElementById("dueDate");

const validFormFieldInput = (e) => {
	e.preventDefault();
	const taskName = newTaskNameInput.value;
	const taskDescription = newTaskDescriptionInput.value;
	const assignedTo = newAssignedInput.value;
	const dueDate = newDueDateInput.value;

	tasks.addTask(taskName, taskDescription, assignedTo, dueDate);
	tasks.render();
	tasks.save();

	document.getElementById("myForm").reset();
};
document.getElementById("btnAddTask").style.display='block';
document.getElementById("btnAddTask").addEventListener("click", function() {
	const taskName = newTaskNameInput.value;
	const taskDescription = newTaskDescriptionInput.value;
	const assignedTo = newAssignedInput.value;
	const dueDate = newDueDateInput.value;

	if (taskName === "") {
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

const taskList = document.qetElementById("displayCard2");

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
