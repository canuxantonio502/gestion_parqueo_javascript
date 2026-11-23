// Nos aseguramos de que exista el administrador por defecto
getAdmin()

const loginBtn = document.querySelector("#login-btn")
const loginModal = document.getElementById("loginModal")
const closeModal = document.getElementById("closeModal")
const loginForm = document.getElementById("loginForm")
const message = document.getElementById("message")

const registerBtn = document.querySelector("#register-btn")
const registerModal = document.getElementById("registerModal")
const closeRegisterModal = document.getElementById("closeRegisterModal")
const registerForm = document.getElementById("registerForm")
const registerMessage = document.getElementById("registerMessage")

const goToRegister = document.getElementById("goToRegister")
const goToLogin = document.getElementById("goToLogin")

// Abrimos y cerramos los modales
function openLogin() {
    registerModal.style.display = "none"
    loginModal.style.display = "flex"
}

function openRegister() {
    loginModal.style.display = "none"
    registerModal.style.display = "flex"
}

loginBtn.addEventListener("click", openLogin)
registerBtn.addEventListener("click", openRegister)

closeModal.addEventListener("click", () => {
    loginModal.style.display = "none"
})

closeRegisterModal.addEventListener("click", () => {
    registerModal.style.display = "none"
})

goToRegister.addEventListener("click", e => {
    e.preventDefault()
    openRegister()
})

goToLogin.addEventListener("click", e => {
    e.preventDefault()
    openLogin()
})

// Abrimos el modal solicitado desde la vista de invitado (?auth=login | ?auth=register)
const authParam = new URLSearchParams(window.location.search).get("auth")

if (authParam === "login") {
    openLogin()
} else if (authParam === "register") {
    openRegister()
}

// ================= LOGIN =================
loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value
    const account = findAccount(email)

    if (account && account.password === password) {
        startSession(account)
        message.style.color = "green"
        message.textContent = "Acceso concedido"
        setTimeout(() => {
            window.location.href = "dashboard.html"
        }, 1000)
    } else {
        message.style.color = "red"
        message.textContent = "Credenciales incorrectas"
    }
})

// ================= REGISTRO =================
registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const name = document.getElementById("registerName").value.trim()
    const email = document.getElementById("registerEmail").value.trim()
    const password = document.getElementById("registerPassword").value
    const confirm = document.getElementById("registerConfirm").value

    if (password.length < 6) {
        registerMessage.style.color = "red"
        registerMessage.textContent = "La contraseña debe tener mínimo 6 caracteres"
        return
    }

    if (password !== confirm) {
        registerMessage.style.color = "red"
        registerMessage.textContent = "Las contraseñas no coinciden"
        return
    }

    if (findAccount(email)) {
        registerMessage.style.color = "red"
        registerMessage.textContent = "El email ya está registrado"
        return
    }

    const user = {
        name,
        email,
        password,
        createdAt: new Date().getTime()
    }

    const users = getUsers()
    users.push(user)
    saveUsers(users)

    startSession({
        ...user,
        role: "user"
    })
    registerMessage.style.color = "green"
    registerMessage.textContent = "Cuenta creada"
    setTimeout(() => {
        window.location.href = "dashboard.html"
    }, 1000)
})
