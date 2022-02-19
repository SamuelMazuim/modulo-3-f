let userInput = document.getElementById("userName");
let passwordInput = document.getElementById("exampleInputPassword1");
let btLogin = document.getElementById("login");

function login() {
    const users = allAccountsLocalStorage();
    let user = {
        name: userInput.value,
        password: passwordInput.value,
    };
    if ((userInput.value == !!"") | (passwordInput.value == !!"")) {
        return alert("Please don't let any empty fields.");
    }
    if (!loginCheck(user)) {
        window.location.assign("taskAssistant.html");
    } else alert("Incorrect username or password, please try again.");
}

function loginCheck(userN) {
    const users = allAccountsLocalStorage();
    const loggedUser = users.find(function (user) {
        return user.name === userN.name && user.password === userN.password;
    });
    if (loggedUser) {
        localStorage.setItem("loggedAccount", loggedUser.id);
        return false;
    }
    return true;
}

function allAccountsLocalStorage() {
    const users = localStorage.getItem("accounts");
    return JSON.parse(users) ?? [];
}

btLogin.onclick = () => login();
