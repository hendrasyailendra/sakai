/* Javascript for clearing text boxes with default text */

function clearIfDefaultString(formField, defaultString) {
    if(formField.value == defaultString) {
        formField.value = "";
    }
}

/* Javascript for enabling or disabling self join/switch options */

function updateOptionBoxes(externallyManaged) {
if(externallyManaged == null) {
	var external = document.optionsForm[3];
	var internal = document.optionsForm[4];
	if(external.checked) {
		externallyManaged = external;
	} else {
		externallyManaged = internal;
	}	

}
	var selfJoin = document.getElementById("optionsForm:selfRegister");
	var selfSwitch = document.getElementById("optionsForm:selfSwitch");

	if(externallyManaged.value=='external') {
		// Automatic section management is selected
		selfJoin.checked = false;
		selfJoin.disabled = true;
		selfSwitch.checked = false;
		selfSwitch.disabled = true;
	} else {
		// Manual section management is selected
		selfJoin.disabled = false;
		selfSwitch.disabled = false;
	}
}


/* Javascript for moving users between multi-select lists */

var selectedUsers;
var availableUsers;

/**
  We need to check to see whether this page contains a "memberForm", which is
  what we will name any form containing the bulk-move lists in the UI.  We also
  need to follow the naming convention "availableUsers" and "selectedUsers" for
  the select lists on these pages.
*/
function prepForms() {
    if(document.getElementById("memberForm")) {
        populateLists();
        unHighlightUsers();
        updateTotalMembers();
    }

    if(document.getElementById("optionsForm")) {
    	updateOptionBoxes();
    }
}

function updateTotalMembers() {
    if(document.getElementById("memberForm:max")) {
	    var currentNum = document.getElementById("memberForm:selectedUsers").length;
        if(document.getElementById("memberForm:max").innerHTML.indexOf("/") == -1) {
            document.getElementById("memberForm:max").innerHTML = currentNum;
        } else {
	        htmlToKeep = document.getElementById("memberForm:max").innerHTML.split("/")[1];
	        document.getElementById("memberForm:max").innerHTML = currentNum + "/" + htmlToKeep;
        }
    }
}

function populateLists(){
    availableUsers = document.getElementById("memberForm:availableUsers");
    selectedUsers = document.getElementById("memberForm:selectedUsers");
}

function removeUser(){
    var count = 0;
    var selectedArray = new Array();
    for (var i=0; i<selectedUsers.options.length; i++) {
        if (selectedUsers.options[i].selected) {
            selectedArray[count++] = selectedUsers.options[i];
        }
    }

    for (var i=0; i<selectedArray.length; i++) {
        availableUsers.appendChild(selectedArray[i]);
        selectNone(selectedUsers,availableUsers);
    }
    updateTotalMembers()
}

function addUser(){
    var count = 0;
    var selectedArray = new Array();
    for (var i=0; i<availableUsers.options.length; i++) {
        if (availableUsers.options[i].selected) {
            selectedArray[count++] = availableUsers.options[i];
        }
    }

    for (var i=0; i<selectedArray.length; i++) {
        selectedUsers.appendChild(selectedArray[i]);
        selectNone(selectedUsers,availableUsers);
    }
    updateTotalMembers()
}

function removeAll(){
    var len = selectedUsers.length;
    var removeArray = new Array();

    // Generate an array of all options (don't use the options availableUsers
    // object due to concurrent modification).
    for(i=0; i<len; i++){
        removeArray[i] = selectedUsers.options.item(i);
    }
   
    // Add the items to the available list
    for(i=0;i<removeArray.length;i++) {
        availableUsers.appendChild(removeArray[i]);
    }

    selectNone(selectedUsers,availableUsers);
    updateTotalMembers()
}

function addAll(){
    var len = availableUsers.length;
    var addArray = new Array();

    // Generate an array of all options (don't use the options availableUsers
    // object due to concurrent modification).
    for(i=0; i<len; i++){
        addArray[i] = availableUsers.options.item(i);
    }
   
    // Add the items to the selected list
    for(i=0;i<addArray.length;i++) {
        selectedUsers.appendChild(addArray[i]);
    }

    selectNone(selectedUsers,availableUsers);
    updateTotalMembers()
}

function selectNone(list1,list2){
    list1.selectedIndex = -1;
    list2.selectedIndex = -1;
}

function highlightUsers() {
    // Select all of the selected users, so they are sent in the form submit
    var selectBox = document.getElementById("memberForm:selectedUsers");
    for(var i = 0; i < selectBox.length; i++) {
        selectBox.options[i].selected = true;
    }

    // Select all of the available users, so they are sent in the form submit
    var selectBox = document.getElementById("memberForm:availableUsers");
    for(var i = 0; i < selectBox.length; i++) {
        selectBox.options[i].selected = true;
    }
}

function unHighlightUsers() {
    // Unselect all of the selected users, so they are clear on page load
    var selectBox = document.getElementById("memberForm:selectedUsers");
    for(var i = 0; i < selectBox.length; i++) {
        selectBox.options[i].selected = false;
    }

    // Unselect all of the available users, so they are clear on page load
    var selectBox = document.getElementById("memberForm:availableUsers");
    for(var i = 0; i < selectBox.length; i++) {
        selectBox.options[i].selected = false;
    }
}

function setSectionPageFocus() {
	var focusElementId = document.forms[0].name + ":elementToFocus";	
	if(document.getElementById(focusElementId)) {
		var elementId = document.getElementById(focusElementId).value;
		if(document.getElementById(elementId)) {
				var element = document.getElementById(elementId);
				element.focus();
		}
	}
}
