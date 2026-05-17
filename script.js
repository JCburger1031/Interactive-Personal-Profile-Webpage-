document.addEventListener("DOMContentLoaded", function () {

// PROFILE PIC
const pic = document.getElementById("profilePic");
const fileInput = document.getElementById("fileInput");

pic.onclick = () => fileInput.click();

fileInput.onchange = () => {
    const file = fileInput.files[0];
    if (file) {
        pic.src = URL.createObjectURL(file);
        localStorage.setItem("pic", pic.src);
        console.log("Profile picture updated");
    }
};

// EDIT TEXT
window.editText = function(id) {
    const el = document.getElementById(id);
    el.contentEditable = true;
    el.focus();

    el.onblur = save;
    el.onkeypress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            el.blur();
        }
    };

    function save() {
        el.contentEditable = false;
        localStorage.setItem(id, el.innerText);
        console.log(id + " edited");
    }
}

// ADD ITEM
window.addItem = function(listId) {
    const ul = document.getElementById(listId);

    const input = document.createElement("input");
    input.placeholder = "Type and press Enter";

    ul.parentNode.insertBefore(input, ul.nextSibling);
    input.focus();

    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter" && input.value.trim() !== "") {
            const li = document.createElement("li");
            li.innerText = input.value;
            li.draggable = true;

            ul.appendChild(li);
            attachEvents(li);
            input.remove();

            saveData();
            console.log(listId + " added: " + li.innerText);
        }
    });
}

// DELETE
window.deleteSelected = function(listId) {
    document.querySelectorAll(`#${listId} .selected`).forEach(li => {
        li.remove();
        console.log("Item deleted");
    });
    saveData();
}

// CLICK SELECT + DRAG
function attachEvents(li) {
    li.addEventListener("click", function(e) {
        e.stopPropagation();
        li.classList.toggle("selected");
        console.log("Item selected");
    });

    li.draggable = true;

    li.addEventListener("dragstart", function() {
        window.dragged = li;
    });

    li.addEventListener("dragover", function(e) {
        e.preventDefault();
    });

    li.addEventListener("drop", function(e) {
        e.preventDefault();
        if (window.dragged !== li) {
            li.parentNode.insertBefore(window.dragged, li);
            saveData();
            console.log("Item reordered");
        }
    });
}

// APPLY EVENTS
document.querySelectorAll("li").forEach(attachEvents);

// EDUCATION
window.editEducation = function() {
    document.querySelectorAll("#education p").forEach(p => {
        p.contentEditable = true;
    });
    console.log("Education edited");
}

window.addEducation = function() {
    const div = document.getElementById("education");
    const p = document.createElement("p");
    p.contentEditable = true;
    p.innerText = "New School - Course - Year";
    div.appendChild(p);
    console.log("Education added");
}

// SAVE DATA
function saveData() {
    localStorage.setItem("skills", document.getElementById("skills").innerHTML);
    localStorage.setItem("hobbies", document.getElementById("hobbies").innerHTML);
}

// LOAD DATA
if (localStorage.getItem("skills")) {
    document.getElementById("skills").innerHTML = localStorage.getItem("skills");
}
if (localStorage.getItem("hobbies")) {
    document.getElementById("hobbies").innerHTML = localStorage.getItem("hobbies");
}
if (localStorage.getItem("name")) {
    document.getElementById("name").innerText = localStorage.getItem("name");
}
if (localStorage.getItem("bio")) {
    document.getElementById("bio").innerText = localStorage.getItem("bio");
}
if (localStorage.getItem("pic")) {
    document.getElementById("profilePic").src = localStorage.getItem("pic");
}

document.querySelectorAll("li").forEach(attachEvents);

// RESET
window.resetData = function() {
    localStorage.clear();
    location.reload();
    console.log("Reset all data");
}

});
