// Sin sesión activa, enviamos al visitante a la vista de invitado
const activeSession = getSession()

if (!activeSession) {
    window.location.replace("guest.html")
}

document.addEventListener("DOMContentLoaded", () => {
    if (!activeSession) return

    const sessionName = document.getElementById("admin")
    const logoutBtn = document.getElementById("logoutBtn")

    // Mostramos el nombre de la cuenta activa
    sessionName.textContent = activeSession.name

    // Cerramos la sesión al salir
    logoutBtn.addEventListener("click", () => {
        endSession()
    })
})
