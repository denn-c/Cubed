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

const deselectedTable = document.querySelector('.table__body--deselected')
const selectedTable = document.querySelector('.table__body--selected')

const isRowInActiveList = (rowId, excludedCheckboxId) =>
    Object.keys(typeWork).some(
        (key) =>
            key !== excludedCheckboxId &&
            document.getElementById(key).checked &&
            typeWork[key].includes(rowId)
    )

const updateButtonIcon = (button, isDeselected) => {
    const img = button?.querySelector('.table__img')
    if (img) {
        img.src = isDeselected
            ? 'asset/icons/xmark.svg'
            : 'asset/icons/check.svg'
    }
}

const moveRows = (checkboxId, isChecked) => {
    const rowsToMove = typeWork[checkboxId]
    if (!rowsToMove) return

    rowsToMove.forEach((rowId) => {
        if (!isChecked && isRowInActiveList(rowId, checkboxId)) return

        const row = document.querySelector(`.table__row[id="${rowId}"]`)
        if (row) {
            const targetTable = isChecked ? selectedTable : deselectedTable
            targetTable.appendChild(row)
            const button = row.querySelector('.table__button--move')
            updateButtonIcon(button, targetTable !== deselectedTable)
        }
    })
}

document.querySelectorAll('.form__checkbox--task').forEach((checkbox) => {
    moveRows(checkbox.id, checkbox.checked)
    checkbox.addEventListener('change', (event) => {
        moveRows(event.target.id, event.target.checked)
    })
})

document.querySelectorAll('.table__button--move').forEach((button) => {
    button.addEventListener('click', (event) => {
        const row = event.target.closest('.table__row')
        if (row) {
            const targetTable =
                row.closest('.table__body') === deselectedTable
                    ? selectedTable
                    : deselectedTable
            targetTable.appendChild(row)
            updateButtonIcon(button, targetTable !== deselectedTable)
        }
    })
})

document
    .querySelector('.table__data--search')
    .addEventListener('input', (event) => {
        const searchValue = event.target.value.toLowerCase()
        const rows = document.querySelectorAll(
            '.table__body--deselected .table__row'
        )

        rows.forEach((row) => {
            if (row.id === '1') {
                row.style.display = ''
                return
            }
            const cell = row.querySelector('.table__cell')
            if (cell) {
                const cellText = cell.textContent.toLowerCase()
                row.style.display = cellText.startsWith(searchValue)
                    ? ''
                    : 'none'
            }
        })
    })


document.querySelector('.table__data--search').addEventListener('focus', () => {
    const table = document.getElementById('materials')
    table.scrollIntoView({ behavior: 'smooth', block: 'start' })
})