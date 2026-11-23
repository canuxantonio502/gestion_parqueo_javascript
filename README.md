# CampusParking Control 🚗🏍️

**ParkingControl** es un sistema web de gestión y control de parqueo desarrollado con tecnologías frontend nativas. Está enfocado en la administración eficiente de vehículos, el control dinámico de espacios y el cálculo automático de cobros en tiempo real.

---

## 📌 Características Principales

### Sistema de Autenticación
*   Inicio de sesión para el Administrador y usuarios registrados.
*   Registro de nuevos usuarios (nombre, email y contraseña).
*   Validación de credenciales y prevención de emails duplicados.
*   Opción para actualizar correo y contraseña de la cuenta activa.
*   Persistencia de usuarios y sesión mediante `LocalStorage` (`admin`, `users`, `session`).
*   El dashboard solo es accesible con una sesión activa.

### Vista de Invitado
*   Vista previa del dashboard (`guest.html`) con datos de ejemplo.
*   Todas las funciones están bloqueadas: al intentar usarlas se invita a iniciar sesión o registrarse.
*   Accesible desde el botón **Ver disponibilidad** de la página principal.

### Gestión de Vehículos (CRUD)
*   Registro, lectura, actualización y eliminación de vehículos.
*   Filtro y visualización en tiempo real de vehículos activos.
*   **Validación de placas guatemaltecas:**
    *   **Carros:** Formato `P123ABC`
    *   **Motos:** Formato `M123ABC`

### Control de Parqueo
*   *Slots* dinámicos separados por tipo de vehículo (Carros / Motos).
*   Monitoreo visual de espacios ocupados y libres.
*   Asignación automática de *slots* disponibles.
*   Sistema de prevención de espacios duplicados.
*   Interfaz interactiva para la visualización del estado del parqueo.

### Control de Tiempo y Cobro
*   Registro automatizado de la hora de entrada y salida.
*   Cálculo exacto del tiempo de permanencia.
*   Cálculo automático de la tarifa basada en la siguiente estructura de cobro:

| Vehículo | Tarifa por Hora |
| :--- | :--- |
| **🚗 Carro** | Q10.00 / hr |
| **🏍️ Moto** | Q5.00 / hr |

### Historial de Parqueo
*   Registro persistente de todas las salidas procesadas.
*   Motor de búsqueda optimizado por número de placa.
*   Desglose detallado por registro: Hora de entrada, hora de salida, tiempo total transcurrido y total pagado.

### Generaciòn de reportes
*   Selecciòn de un rango de fechas.
*   Bùsqueda del historial registrado entre el rango de fechas.
*   Despliegue de tabla con la informaciòn de los vehìculos y cards con informaciòn general.

---

## 🛠️ Tecnologías Utilizadas

*   **HTML5** 
*   **CSS3**
*   **JavaScript**
*   **LocalStorage**
*   **GitHuab**

---

## 📂 Estructura del Proyecto

```text
project/
│
├── index.html
├── dashboard.html
├── guest.html
│
├── css/
│   ├── index-style.css
│   └── dashboard-style.css
│
├── js/
│   ├── lgn.js
│   ├── session.js
│   ├── guard.js
│   ├── guest.js
│   ├── dashboard.js
│   ├── history.js
│   ├── stats.js
│   ├── profile.js
│   ├── reports.js
│   └── earnings.js
│
└── assets/
```
---

### :feather: Autores

He aquí los responsables de que este proyecto se haya podido llevar a cabo:

* **Antonio Canux** - *Único colaborador* - [canuxantonio502](https://github.com/canuxantonio502)

