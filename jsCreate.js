let createUser = document.getElementById("createUser")
let createPassword = document.getElementById("exampleInputPassword1")
let btCreate = document.getElementById("createAccount")

btCreate.onclick = () => create()

let userId = () => {
    const users = allAccountsLocalStorage()
    if (users.length == 0) {
        return 1
    }
    const userSlice = users.slice(-1)
    let user = userSlice[0]
    return user.id + 1
}

function create() {
    const users = allAccountsLocalStorage()
    let newUser = {
        id: userId(),
        name: createUser.value,
        password: createPassword.value,
    }
    if (!userNameCheck(newUser.name)) {
        return alert("This username is already in use.")
    }
    if ((createUser.value == !!"") | (createPassword.value == !!"")) {
        return alert("Please don't let any empty fields.")
    }
    localStorage.setItem("accounts", JSON.stringify([...users, newUser]))

    userId++

    const getFromLocalStorage = () =>
        JSON.parse(localStorage.getItem("userTasks" + newUser.id)) ?? []

    setInLocalStorage()

    newUser.tasks.push(getFromLocalStorage())
}

function userNameCheck(userName) {
    const users = allAccountsLocalStorage()
    if (
        users.findIndex(function (user) {
            return user.name === userName
        }) != "-1"
    ) {
        return false
    }
    return true
}

function allAccountsLocalStorage() {
    const users = localStorage.getItem("accounts")
    return JSON.parse(users) ?? []
}

btCreate.onclick = () => create()
