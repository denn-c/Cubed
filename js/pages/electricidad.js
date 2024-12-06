const phone = document.getElementById('phone')

phone.addEventListener(
    'input',
    () => (phone.value = phone.value.replace(/[^0-9]/g, ''))
)

const cellAmount = document.querySelectorAll('.table__cell:nth-child(2)')

cellAmount.forEach((cell) => {
    const decrementButton = cell.querySelector('.table__button--decrement')
    const incrementButton = cell.querySelector('.table__button--increment')
    const amountInput = cell.querySelector('.table__data')

    amountInput.addEventListener(
        'input',
        () => (amountInput.value = amountInput.value.replace(/[^0-9]/g, ''))
    )

    amountInput.addEventListener('focus', () => amountInput.select())

    decrementButton.addEventListener('click', () => {
        let currentValue = parseInt(amountInput.value, 10) || 0
        amountInput.value = Math.max(1, currentValue - 1)
    })

    incrementButton.addEventListener('click', () => {
        let currentValue = parseInt(amountInput.value, 10) || 0
        amountInput.value = currentValue + 1
    })
})

const typeWork = {
    piped: [32, 36, 39, 42, 43, 51, 63, 65],
    inside: [2, 3, 6, 7, 8, 9, 11, 12, 16, 27, 28, 29, 30, 52, 53, 60, 61, 62],
    roof: [38, 42, 43, 44, 45, 51, 63],
    rural: [4, 10, 17, 29, 35, 58, 60, 64],
}

// Selecciona los cuerpos de las tablas
const checkboxes = document.querySelectorAll('.form__task .form__checkbox')
const selectedTableBody = document.querySelector('.table__body--selected')
const deselectedTableBody = document.querySelector('.table__body--deselected')
// const checkboxes = document.querySelectorAll('.form__checkbox');

// Función para mover filas entre tablas
function moveRow(rowId, fromTableBody, toTableBody) {
    const row = fromTableBody.querySelector(`tr[id="${rowId}"]`)
    if (row) {
        toTableBody.appendChild(row) // Mueve la fila a la tabla destino
    }
}

// Función para actualizar las filas según los checkboxes seleccionados
function updateRows() {
    const selectedIds = new Set()

    // Agregar los IDs de los checkboxes seleccionados
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const workType = typeWork[checkbox.id]
            workType.forEach((id) => selectedIds.add(id))
        }
    })

    // Mover filas a la tabla correspondiente
    selectedTableBody.querySelectorAll('.table__row').forEach((row) => {
        if (!selectedIds.has(Number(row.id))) {
            moveRow(row.id, selectedTableBody, deselectedTableBody)
        }
    })

    deselectedTableBody.querySelectorAll('.table__row').forEach((row) => {
        if (selectedIds.has(Number(row.id))) {
            moveRow(row.id, deselectedTableBody, selectedTableBody)
        }
    })
}

// Agrega el evento a los checkboxes
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', updateRows)
})

// Inicializa el estado de las filas
updateRows()
