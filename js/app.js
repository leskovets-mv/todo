const finished = document.querySelector('.finished');
const unfinished = document.querySelector('.unfinished');
const addTask = document.querySelector('.add-task');
const addBtn = addTask.querySelector('a');
const finishedHeader = document.querySelector('.finished-header');
let is_finishedHeader = false;

addBtn.addEventListener('click', addedTask);

function addedTask(ev) {
    ev.preventDefault();
    let text = addTask.querySelector('textarea');
    let value = text.value;
    if (value !== '') {
        render(value, unfinished)
    }
    text.value = '';
}

function render(value, status) {
    let checkedBlock, titleBlock, actionBlock, render, ul, input, label;
    ul = document.createElement('ul');
    input = document.createElement('input');
    label = document.createElement('label');
    render = document.createElement('li');
    checkedBlock = document.createElement('li');
    titleBlock = document.createElement('li');
    actionBlock = document.createElement('li');
    ul.className = 'list-inline';
    render.className = 'list-group-item';
    checkedBlock.className = 'd-inline-block';
    checkedBlock.classList.add('w-25');
    titleBlock.className = 'd-inline-block';
    actionBlock.className = 'd-inline-block';
    actionBlock.classList.add('float-right');
    actionBlock.classList.add('w-25');
    label.innerText = value;
    input.type = 'checkbox';
    input.addEventListener('click', checkAction);

    if (status === finished) {
        input.checked = true;
    } else if (status === unfinished) {
        renderActionBtn(actionBlock);
        input.checked = false;
    }

    ul.appendChild(checkedBlock);
    checkedBlock.appendChild(input);
    titleBlock.appendChild(label);
    ul.appendChild(titleBlock);
    ul.appendChild(actionBlock);
    render.appendChild(ul);
    status.appendChild(render);
}

function renderActionBtn(actionBlock) {
    let editBtn, saveBtn, deleteBtn, pencilIcon, floppyIcon, deleteIcon;
    editBtn = document.createElement('a');
    saveBtn = document.createElement('a');
    deleteBtn = document.createElement('a');
    pencilIcon = document.createElement('i');
    floppyIcon = document.createElement('i');
    deleteIcon = document.createElement('i');
    editBtn.href = '#';
    saveBtn.href = '#';
    deleteBtn.href = '#';
    editBtn.className = 'edit';
    saveBtn.className = 'save';
    deleteBtn.className = 'delete';
    editBtn.classList.add('mr-3');
    saveBtn.classList.add('mr-3');
    deleteBtn.classList.add('mr-3');
    pencilIcon.className = ('fa');
    floppyIcon.className = ('fa');
    deleteIcon.className = ('fa');
    pencilIcon.classList.add('fa-pencil');
    floppyIcon.classList.add('fa-floppy-o');
    deleteIcon.classList.add('fa-trash-o');
    editBtn.appendChild(pencilIcon);
    saveBtn.appendChild(floppyIcon);
    deleteBtn.appendChild(deleteIcon);
    saveBtn.addEventListener('click', saveAction);
    editBtn.addEventListener('click', editAction);
    deleteBtn.addEventListener('click', deleteAction);
    actionBlock.appendChild(editBtn);
    actionBlock.appendChild(saveBtn);
    actionBlock.appendChild(deleteBtn);
}

function saveAction(ev) {
    ev.preventDefault();
    let task = this.closest('.list-group-item');
    if (task.classList.contains('.edit')) {
        let input = task.querySelector('input[name="task"]');
        let taskValue = input.value;
        let label = document.createElement('label');
        input.parentElement.appendChild(label);
        label.innerHTML = taskValue;
        input.remove();
        task.classList.remove('.edit');
    }
}

function editAction(ev) {
    ev.preventDefault();
    let task = this.closest('.list-group-item');
    if (!task.classList.contains('.edit')) {
        let label = task.querySelector('label');
        let taskValue = label.innerText;
        let input = document.createElement('input');
        input.name = 'task';
        input.type = 'text';
        input.value = taskValue;
        label.parentElement.appendChild(input);
        label.remove();
        task.classList.add('.edit');
    }
}

function deleteAction(ev) {
    ev.preventDefault();
    let task = this.closest('.list-group-item');
    task.remove()
}

function checkAction(ev) {
    let task = this.closest('.list-group-item');
    let label = task.querySelector('label');
    let taskValue = label.innerText;
    task.remove();

    if (is_finishedHeader) {
        if (finished.childNodes.length === 0) {
            finishedHeader.innerHTML = '';
            is_finishedHeader = false;
        }
    } else {
        renderFinishedHeader();
        is_finishedHeader = true;
    }

    if (ev.target.checked) {
        render(taskValue, finished);
    } else {
        render(taskValue, unfinished);
    }
}

function renderFinishedHeader() {
    let title, actionRow, listAction, firstAction, secondAction;

    title = document.createElement('li');
    actionRow = document.createElement('li');
    firstAction = document.createElement('li');
    secondAction = document.createElement('li');
    listAction = document.createElement('ul');
    title.className = 'list-group-item';
    actionRow.className = 'list-group-item';
    title.classList.add('active');
    title.innerText = 'Завершёные';
    listAction.className = 'list-inline';
    firstAction.className = 'd-inline-block';
    secondAction.className = 'd-inline-block';
    firstAction.classList.add('w-25');
    firstAction.classList.add('pl-3');
    firstAction.innerText = 'Вернуть обратно';
    secondAction.innerText = 'Название';

    finishedHeader.appendChild(title);
    listAction.appendChild(firstAction);
    listAction.appendChild(secondAction);
    actionRow.appendChild(listAction);
    finishedHeader.appendChild(actionRow);
}