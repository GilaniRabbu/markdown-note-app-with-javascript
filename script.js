const addBtn = document.getElementById("add");

const Notes = JSON.parse(localStorage.getItem("Notes"));

if (Notes) {
    Notes.forEach((Note) => addNewNote(Note));
}

addBtn.addEventListener("click", () => addNewNote());

function addNewNote(text = "") {
    const Note = document.createElement("div");
    Note.classList.add("note");
    Note.innerHTML = `
            <div class="tools">
                <button class="edit">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button class="delete">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="${text ? "hidden" : ""}"></textarea>
            `;

    const editBtn = Note.querySelector(".edit");
    const deleteBtn = Note.querySelector(".delete");
    const Main = Note.querySelector(".main");
    const TextArea = Note.querySelector("textarea");

    TextArea.value = text;
    Main.innerHTML = marked(text);

    deleteBtn.addEventListener("click", () => {
        Note.remove();
        updateLS();
    });

    editBtn.addEventListener("click", () => {
        Main.classList.toggle("hidden");
        TextArea.classList.toggle("hidden");
    });

    TextArea.addEventListener("input", (e) => {
        const { value } = e.target;
        Main.innerHTML = marked(value);
        updateLS();
    });

    document.body.appendChild(Note);
}

function updateLS() {
    const NoteText = document.querySelectorAll("textarea");
    const Notes = [];

    NoteText.forEach((Note) => Notes.push(Note.value));
    localStorage.setItem("Notes", JSON.stringify(Notes));
}