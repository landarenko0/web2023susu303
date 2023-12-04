var notes = [];
isEdit = false;

// Открытие формы для создания
function openForm() {
    const form = document.getElementById("tmp");
    const popup = document.querySelector('.popup');

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("ids").value = "1";

    form.classList.add('open');
    popup.classList.add('popup_open');
}

// Отправка формы
function onSubmit() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const id = document.getElementById("ids").value;

    if (!isEdit) sendNote(title, description, id);
    else editNote(parseInt(document.getElementById("idsToEdit").value), title, description, parseInt(id));

    document.getElementById("tmp").classList.remove("open");
    document.querySelector('.popup').classList.remove("popup_open");

    return false;
}

// Закрытие формы
function onReset() {
    document.getElementById("tmp").classList.remove("open");
    document.querySelector('.popup').classList.remove("popup_open");

    isEdit = false;
}

// Отправка на сервер
async function sendNote(title, description, id) {
    let preloaderEl = document.getElementById('preloader');
    preloaderEl.classList.add('visible');
    preloaderEl.classList.remove('hidden');
    
    let jsonResponse;
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(response => response.json()).then(json => { jsonResponse = JSON.stringify(json) });

    const user = JSON.parse(jsonResponse);

    var maxId = 0;
    if (notes.length != 0) {
        maxId = 0;

        notes.forEach(note => {
            if (note.noteId > maxId) {
                maxId = note.noteId;
            }
        });

        maxId++;
    }
    
    await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({
            author: user.name,
            title: title,
            description: description,
            noteId: maxId,
            userId: id
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
    })
      .then(response => response.json())
      .then(json => { jsonResponse = JSON.stringify(json) });

    const note = JSON.parse(jsonResponse);
    addNote(note);

    preloaderEl.classList.remove('visible');
    preloaderEl.classList.add('hidden');
}

// Добавление задачи в список
function addNote(note) {
    notes.push(note);
    updateNotesList();
}

// Обновление списка задач
function updateNotesList() {
    document.getElementById("idsToEdit").innerHTML = "";
    document.getElementById("idsToDelete").innerHTML = "";
    document.getElementById("notes").innerHTML = "";

    notes.forEach(note => {
        document.getElementById("idsToEdit").innerHTML += `<option>${note.noteId}</option>`;
        document.getElementById("idsToDelete").innerHTML += `<option>${note.noteId}</option>`;

        document.getElementById("notes").innerHTML += `
        <div class="note">
            <p>Автор: ${note.author}</p>
            <p>Заголовок: ${note.title}</p>
            <p>Описание: ${note.description}</p>
            <p>ID задачи: ${note.noteId}</p>
        </div>
        <p></p>`;
    });
}

// Удаление задачи
function deleteNote() {
    const noteId = document.getElementById("idsToDelete").value;
    
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].noteId == noteId) {
            notes.splice(i, 1);
            break;
        }
    }

    updateNotesList();
}

// Открытие формы для редактирования
function openFormForEdit() {
    const noteId = parseInt(document.getElementById("idsToEdit").value);

    const form = document.getElementById("tmp");
    const popup = document.querySelector('.popup');

    document.getElementById("title").value = notes[noteId].title;
    document.getElementById("description").value = notes[noteId].description;
    document.getElementById("ids").value = notes[noteId].userId;

    form.classList.add('open');
    popup.classList.add('popup_open');

    isEdit = true;
}

// Редактировние задачи
async function editNote(noteId, title, description, id) {
    let preloaderEl = document.getElementById('preloader');
    preloaderEl.classList.add('visible');
    preloaderEl.classList.remove('hidden');
    
    let jsonResponse;
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(response => response.json()).then(json => { jsonResponse = JSON.stringify(json) });

    const user = JSON.parse(jsonResponse);
    
    notes[noteId].author = user.name;
    notes[noteId].title = title;
    notes[noteId].description = description;
    notes[noteId].userId = id;

    updateNotesList();
    isEdit = false;

    preloaderEl.classList.remove('visible');
    preloaderEl.classList.add('hidden');
}