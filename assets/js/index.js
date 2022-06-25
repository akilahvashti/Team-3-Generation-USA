
window.addEventListener("load", init);

function init() {
    let displayCard2 = document.getElementById('displayCard2');
    let taskName = document.getElementById('txtTaskNameEntry');
    let taskDescription = document.getElementById('txtTaskDescription');
    let assignedTo = document.getElementById('txtAssignedTo');
    let dateDue = document.getElementById('txtDateDue');
    let lblTaskName = document.getElementById('lblTaskName');
    let lblTaskDescription = document.getElementById('lblTaskDescription');
    let lblAssignedTo = document.getElementById('lblAssignedTo');
    let lblDateDue = document.getElementById('lblDateDue');
}

function updateInfo() {
    lblTaskName.value = taskName.value;
    lblTaskDescription.value = taskDescription.value;
    lblAssignedTo.value = assignedTo.value;
    lblDateDue.value = dueDate.value;
}

function changeDisplayCard() {
    displayCard2.style.visibility = "visible";
}

function validate() {
    // var returnValue=true;
    if (document.getElementById('txtTaskNameEntry').value == "") {
        alert("Name must be filled out.\nPlease try again.");
        document.getElementById('txtTaskNameEntry').value = "";
        document.getElementById('txtTaskNameEntry').focus();
        return false;
    }else{
        document.getElementById('lblTaskName').value = document.getElementById('txtTaskNameEntry').value;
    }

    if(document.getElementById('txtTaskDescription').value == "") {
        alert("Description must be filled out.\nPlease try again.");
        document.getElementById('txtTaskDescription').value = "";
        document.getElementById('txtTaskDescription').focus();
        return false;
    }else{
        document.getElementById('lblTaskDescription').value = document.getElementById('txtTaskDescription').value;
    }

    if(document.getElementById('txtAssignedTo').value == "") {
        alert("Task must be assigned.\nPlease try again.");
        document.getElementById('txtAssignedTo').value = "";
        document.getElementById('txtAssignedTo').focus();
        return false;
    }else{
        document.getElementById('lblAssignedTo').value = document.getElementById('txtAssignedTo').value
    }

    if(document.getElementById('txtDateDue').value == "") {
        alert("Due Date must be set");
        document.getElementById('txtDateDue').value ="";
        document.getElementById('txtDateDue').focus();
        return false;
    }else{
        document.getElementById('lblDateDue').value = document.getElementById('txtDateDue').value;
    }

}
