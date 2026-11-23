// Llaves utilizadas en LocalStorage
const STORAGE_KEYS = {
    admin: "admin",
    users: "users",
    session: "session"
}

// Obtenemos el administrador (lo creamos si no existe)
function getAdmin() {
    let admin = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.admin)
    )

    if (!admin) {
        admin = {
            email: "admin@campusparking.com",
            password: "Admin123"
        }
        localStorage.setItem(
            STORAGE_KEYS.admin,
            JSON.stringify(admin)
        )
    }
    return admin
}

// Obtenemos los usuarios registrados
function getUsers() {
    return JSON.parse(
        localStorage.getItem(STORAGE_KEYS.users)
    ) || []
}

// Guardamos los usuarios registrados
function saveUsers(users) {
    localStorage.setItem(
        STORAGE_KEYS.users,
        JSON.stringify(users)
    )
}

// Buscamos una cuenta (administrador o usuario) por su email
function findAccount(email) {
    const admin = getAdmin()

    if (admin.email === email) {
        return {
            name: "Administrador",
            email: admin.email,
            password: admin.password,
            role: "admin"
        }
    }

    const user = getUsers().find(
        user => user.email === email
    )
    if (!user) return null

    return {
        ...user,
        role: "user"
    }
}

// Actualizamos el email y contraseña de una cuenta
function updateAccount(currentEmail, newEmail, newPassword) {
    const emailTaken = newEmail !== currentEmail &&
        findAccount(newEmail)
    if (emailTaken) return false

    const admin = getAdmin()

    if (admin.email === currentEmail) {
        admin.email = newEmail
        admin.password = newPassword
        localStorage.setItem(
            STORAGE_KEYS.admin,
            JSON.stringify(admin)
        )
        return true
    }

    const users = getUsers()
    const index = users.findIndex(
        user => user.email === currentEmail
    )
    if (index === -1) return false

    users[index] = {
        ...users[index],
        email: newEmail,
        password: newPassword
    }
    saveUsers(users)
    return true
}

// Obtenemos la sesión activa
function getSession() {
    return JSON.parse(
        localStorage.getItem(STORAGE_KEYS.session)
    )
}

// Iniciamos sesión (sin guardar la contraseña)
function startSession(account) {
    const session = {
        name: account.name,
        email: account.email,
        role: account.role
    }
    localStorage.setItem(
        STORAGE_KEYS.session,
        JSON.stringify(session)
    )
}

// Cerramos la sesión
function endSession() {
    localStorage.removeItem(STORAGE_KEYS.session)
}
