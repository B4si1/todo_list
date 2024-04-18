const form = document.getElementById('crudForm');
const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
let data = [];

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const nameInput = document.getElementById('search-input');
    const name = nameInput.value.trim();
    if (name) {
        addData(name);
        nameInput.value = '';
    }
});

function addData(name) {
    const timestamp = new Date().toLocaleString();
    const newData = { id: Date.now(), name: name, addedTimestamp: timestamp, completed: false, completedTimestamp: null };
    data.push(newData);
    renderData();
}

function deleteData(id) {
    data = data.filter(item => item.id !== id);
    renderData();
}

function toggleCompleted(id) {
    const item = data.find(item => item.id === id);
    item.completed = !item.completed;
    if (item.completed) {
        item.completedTimestamp = new Date().toLocaleString();
    } else {
        item.completedTimestamp = null;
    }
    renderData();
}

function renderData() {
    dataTable.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td>${item.addedTimestamp.toLowerCase()}</td>
            <td><input type="checkbox" ${item.completed ? 'checked' : ''} onchange="toggleCompleted(${item.id})"></td>
            <td>${item.completed ? item.completedTimestamp.toLowerCase() : ''}</td>
            <td><button onclick="deleteData(${item.id})">Delete</button></td>
        `;
        dataTable.appendChild(row);
    });
}