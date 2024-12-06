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

// checkbox acciones

const typeWork = {
    piped: [32, 36, 39, 42, 43, 51, 63, 65],
    inside: [2, 3, 6, 7, 8, 9, 11, 12, 16, 27, 28, 29, 30, 52, 53, 60, 61, 62],
    roof: [38, 42, 43, 44, 45, 51, 63],
    rural: [4, 10, 17, 29, 35, 58, 60, 64],
}

const deselectedTable = document.querySelector('.table__body--deselected')
const selectedTable = document.querySelector('.table__body--selected')

const isRowInActiveList = (rowId, excludedCheckboxId) => {
    return Object.keys(typeWork).some((key) => {
        const checkbox = document.getElementById(key)
        return (
            key !== excludedCheckboxId &&
            checkbox.checked &&
            typeWork[key].includes(rowId)
        )
    })
}

const moveRows = (checkboxId, isChecked) => {
    const rowsToMove = typeWork[checkboxId]
    if (!rowsToMove) return

    rowsToMove.forEach((rowId) => {
        if (!isChecked && isRowInActiveList(rowId, checkboxId)) {
            return
        }

        const row = document.querySelector(
            `.table__body--deselected .table__row[id="${rowId}"], .table__body--selected .table__row[id="${rowId}"]`
        )

        if (row) {
            const targetTable = isChecked ? selectedTable : deselectedTable
            if (isChecked) {
                targetTable.appendChild(row)
            } else {
                targetTable.insertBefore(row, targetTable.firstChild)
            }
        }
    })
}

document.querySelectorAll('.form__checkbox').forEach((checkbox) => {
    moveRows(checkbox.id, checkbox.checked)

    checkbox.addEventListener('change', (event) => {
        moveRows(event.target.id, event.target.checked)
    })
})

