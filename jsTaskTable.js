const description = document.getElementById("description")
const task = document.getElementById("task")
const btLogout = document.getElementById("logout")
const btSave = document.getElementById("save")
const tableBody = document.getElementById("tableBody")

const editModal = new bootstrap.Modal(document.getElementById("editModal"))
const modalImputDescription = document.getElementById("modalDescription")
const modalImputTask = document.getElementById("modalTask")
const modalButtonSave = document.getElementById("confirmSave")

const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"))
const confirmDelete = document.getElementById("confirmDelete")

window.onload = () => {
    const loggedUser = getLoggedAccFromLocalStorage()
    if (loggedUser) {
        attTable()
    }
}

btLogout.onclick = () => {
    localStorage.removeItem("loggedAccount")
    getLoggedAccFromLocalStorage()
}

function createNewTask() {
    const newTask = {
        description: description.value,
        title: task.value,
    }
    if (blankCheck()) {
    } else {
        return alert("Please don't let any empty fields.")
    }

    postTask(newTask)
}
btSave.onclick = () => createNewTask()

let tasks = []

async function attTable() {
    const loggedUser = getLoggedAccFromLocalStorage()
    tasks = await axios
        .get(`https://modulo-3.herokuapp.com/task/${loggedUser}`)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error)
            return []
        })
    tableBody.innerHTML = ""
    tasks.forEach((task, index) => {
        createRow(task, index)
    })
}

function createRow(newTask, index) {
    let tableRow = document.createElement("tr")
    let scopeRow = document.createElement("th")
    scopeRow.innerHTML = index + 1
    let desc = document.createElement("td")
    desc.innerHTML = newTask.description
    let title = document.createElement("td")
    title.innerHTML = newTask.title
    let edit = document.createElement("td")
    edit.innerHTML = `<button id='${newTask.id}' class='btn btn-success'>Edit</button>`
    edit.onclick = () => editButton(newTask.id)
    let del = document.createElement("td")
    del.innerHTML = `<div class="d-grid mx-auto"><button id='${newTask.id}' class='btn btn-danger'>Delete</button></div>`
    del.onclick = () => deleteButton(newTask.id)
    tableRow.appendChild(scopeRow)
    tableRow.appendChild(desc)
    tableRow.appendChild(title)
    tableRow.appendChild(edit)
    tableRow.appendChild(del)
    tableBody.appendChild(tableRow)
}

const editButton = (id) => {
    editModal.show()
    const taskIndex = tasks.findIndex((task) => task.id == id)
    modalImputDescription.value = tasks[taskIndex].description
    modalImputTask.value = tasks[taskIndex].title
    modalButtonSave.onclick = () => {
        const editTask = {
            title: modalImputTask.value,
            description: modalImputDescription.value,
        }
        axios
            .put(`https://modulo-3.herokuapp.com/task/${id}`, editTask)
            .then(function () {
                attTable()
            })
            .catch(function (error) {
                console.log(error)
            })
        editModal.hide()
    }
}

const deleteButton = (id) => {
    const loggedAccount = JSON.parse(localStorage.getItem("loggedAccount"))
    deleteModal.show()
    confirmDelete.onclick = () => {
        axios
            .delete(`https://modulo-3.herokuapp.com/task/${loggedAccount}/${id}`)
            .then(function () {
                attTable()
                console.log(loggedAccount)
            })
            .catch(function (error) {
                console.log(error)
            })
        deleteModal.hide()
    }
}

const blankCheck = () => {
    if ((description.value == "") | (task.value == "")) {
        return false
    }
    return true
}

const getLoggedAccFromLocalStorage = () => {
    const loggedAccount = JSON.parse(localStorage.getItem("loggedAccount"))
    if (loggedAccount == null) {
        return window.location.assign("./login.html")
    }
    return loggedAccount
}

const postTask = (newTask) => {
    const loggedUser = getLoggedAccFromLocalStorage()
    axios
        .post(`https://modulo-3.herokuapp.com/task/${loggedUser}`, newTask)
        .then(function (response) {
            console.log(response)
            attTable()
        })
        .catch(function (error) {
            console.log(error)
        })
}

// https://modulo-3.herokuapp.com/ //
