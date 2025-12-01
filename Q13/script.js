// Function to load notes automatically on page load
window.addEventListener("load", function () {
    const savedNotes = localStorage.getItem("userNotes");
    if (savedNotes) {
        document.getElementById("notes").value = savedNotes;
    }
});

// Save Notes Button
document.getElementById("saveBtn").addEventListener("click", function () {
    const notes = document.getElementById("notes").value;

    if (notes.trim() === "") {
        alert("Cannot save empty notes!");
        return;
    }

    localStorage.setItem("userNotes", notes);
    alert("Notes saved successfully!");
});

// Load Notes Button
document.getElementById("loadBtn").addEventListener("click", function () {
    const savedNotes = localStorage.getItem("userNotes");

    if (savedNotes) {
        document.getElementById("notes").value = savedNotes;
    } else {
        alert("No saved notes found!");
    }
});

// Clear Notes Button
document.getElementById("clearBtn").addEventListener("click", function () {
    localStorage.removeItem("userNotes");
    document.getElementById("notes").value = "";
    alert("Notes cleared!");
});
