const adminBtn = document.getElementById("admin")
const profileModal = document.getElementById("profileModal")
const closeProfileModal = document.getElementById("closeProfileModal")
const profileForm = document.getElementById("profileForm")
const profileMessage = document.getElementById("profileMessage")
const newEmail = document.getElementById("newEmail")
const newPassword = document.getElementById("newPassword")

// Cuenta de la sesión activa
const currentSession = getSession()

adminBtn.addEventListener("click", () => {
    const account = findAccount(currentSession.email)
    profileModal.style.display = "flex"
    newEmail.value = account.email
    newPassword.value = account.password
})

closeProfileModal.addEventListener("click", () => {
    profileModal.style.display = "none"
})

profileForm.addEventListener("submit", e => {
    e.preventDefault()
    const updated = updateAccount(
        currentSession.email,
        newEmail.value.trim(),
        newPassword.value
    )

    if (!updated) {
        profileMessage.style.color = "red"
        profileMessage.textContent =
            "El email ya está en uso"
        return
    }

    profileMessage.style.color = "green"
    profileMessage.textContent =
        "Credenciales actualizadas"
    endSession()
    setTimeout(() => {
        window.location.href = "index.html?auth=login"
    },1500)
})