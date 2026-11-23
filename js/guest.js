// Si ya existe una sesión activa, enviamos al usuario al dashboard
if (getSession()) {
    window.location.replace("dashboard.html")
}

const authModal = document.getElementById("authModal")
const closeAuthModal = document.getElementById("closeAuthModal")
const guestVehiclesBody = document.getElementById("guestVehiclesBody")
const guestHistoryBody = document.getElementById("historyBody")
const carSlotsContainer = document.getElementById("carSlots")
const motoSlotsContainer = document.getElementById("motoSlots")
const truckSlotsContainer = document.getElementById("truckSlots")

// ================= DATOS DE EJEMPLO =================
const today = new Date().toLocaleDateString()

const sampleVehicles = [
    { placa: "P123ABC", tipo: "Carro", fecha: today, horaEntrada: "07:45", slot: "P-01" },
    { placa: "P456DEF", tipo: "Carro", fecha: today, horaEntrada: "08:10", slot: "P-02" },
    { placa: "P789GHI", tipo: "Carro", fecha: today, horaEntrada: "09:30", slot: "P-04" },
    { placa: "M321JKL", tipo: "Moto", fecha: today, horaEntrada: "08:05", slot: "M-01" },
    { placa: "M654MNO", tipo: "Moto", fecha: today, horaEntrada: "10:15", slot: "M-03" },
    { placa: "C987PQR", tipo: "Camión", fecha: today, horaEntrada: "06:50", slot: "C-01" }
]

const sampleHistory = [
    { placa: "P111AAA", tipo: "Carro", horaEntrada: "06:30", horaSalida: "09:00", tiempoTotal: "3 hora(s)", totalPagado: "Q30" },
    { placa: "M222BBB", tipo: "Moto", horaEntrada: "07:00", horaSalida: "08:20", tiempoTotal: "2 hora(s)", totalPagado: "Q10" },
    { placa: "C333CCC", tipo: "Camión", horaEntrada: "05:45", horaSalida: "07:30", tiempoTotal: "2 hora(s)", totalPagado: "Q40" },
    { placa: "P444DDD", tipo: "Carro", horaEntrada: "08:15", horaSalida: "12:00", tiempoTotal: "4 hora(s)", totalPagado: "Q40" },
    { placa: "M555EEE", tipo: "Moto", horaEntrada: "09:00", horaSalida: "10:00", tiempoTotal: "1 hora(s)", totalPagado: "Q5" }
]

// Generamos la lista de slots de un tipo (P-01 ... P-15)
function buildSlots(prefix) {
    return Array.from({ length: 15 }, (_, index) =>
        `${prefix}-${String(index + 1).padStart(2, "0")}`
    )
}

// ================= RENDER =================
function renderGuestVehicles() {
    guestVehiclesBody.innerHTML = ""
    sampleVehicles.forEach(vehicle => {
        guestVehiclesBody.innerHTML += `
            <tr>
                <td>${vehicle.placa}</td>
                <td>${vehicle.tipo}</td>
                <td>${vehicle.fecha}</td>
                <td>${vehicle.horaEntrada}</td>
                <td>${vehicle.slot}</td>
                <td>
                    <button id="deleteBt" data-locked>
                        <i class="fa-solid fa-lock"></i>
                        Eliminar
                    </button>
                </td>
            </tr>
        `
    })
}

function renderGuestSlots(prefix, container) {
    container.innerHTML = ""
    buildSlots(prefix).forEach(slot => {
        const occupied = sampleVehicles.some(v => v.slot === slot)
        const div = document.createElement("div")
        div.classList.add("space", occupied ? "occupied" : "free")
        div.dataset.locked = ""
        div.textContent = slot
        container.appendChild(div)
    })
}

function renderGuestHistory() {
    guestHistoryBody.innerHTML = ""
    sampleHistory.forEach(vehicle => {
        guestHistoryBody.innerHTML += `
            <tr>
                <td>${vehicle.placa}</td>
                <td>${vehicle.tipo}</td>
                <td>${vehicle.horaEntrada}</td>
                <td>${vehicle.horaSalida}</td>
                <td>${vehicle.tiempoTotal}</td>
                <td>${vehicle.totalPagado}</td>
            </tr>
        `
    })
}

function renderGuestStats() {
    const countByType = type =>
        sampleVehicles.filter(vehicle => vehicle.tipo === type).length

    const earnings = sampleHistory.reduce((total, vehicle) =>
        total + parseInt(vehicle.totalPagado.replace("Q", ""), 10), 0
    )

    document.getElementById("activeCount").textContent = sampleVehicles.length
    document.getElementById("carCount").textContent = countByType("Carro")
    document.getElementById("motoCount").textContent = countByType("Moto")
    document.getElementById("truckCount").textContent = countByType("Camión")
    document.getElementById("occupiedCount").textContent = sampleVehicles.length
    document.getElementById("totalEarnings").textContent = `Q${earnings}`
}

// ================= BLOQUEO DE FUNCIONES =================
function openAuthModal() {
    authModal.style.display = "flex"
}

// Cualquier elemento marcado con data-locked abre el modal de acceso
document.addEventListener("click", e => {
    if (e.target.closest("[data-locked]")) {
        e.preventDefault()
        openAuthModal()
    }
})

closeAuthModal.addEventListener("click", () => {
    authModal.style.display = "none"
})

// Cerramos el modal al hacer clic fuera de la caja
authModal.addEventListener("click", e => {
    if (e.target === authModal) {
        authModal.style.display = "none"
    }
})

//Iniciamos
renderGuestStats()
renderGuestVehicles()
renderGuestSlots("P", carSlotsContainer)
renderGuestSlots("M", motoSlotsContainer)
renderGuestSlots("C", truckSlotsContainer)
renderGuestHistory()
