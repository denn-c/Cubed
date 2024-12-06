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
    piped: [33, 37, 40, 43, 44, 52, 64, 66],
    inside: [
        3, 4, 7, 8, 9, 10, 12, 13, 17, 27, 28, 29, 30, 31, 53, 54, 61, 62, 63,
        67,
    ],
    roof: [39, 43, 44, 45, 46, 52, 64],
    rural: [5, 11, 18, 30, 36, 59, 61, 65],
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

const inputSearch = document.querySelector('.table__data--search')
const buttonDelete = document.querySelector('.table__button--delete')
const table = document.getElementById('materials')

const getCellText = (cell) => {
    const span = cell.querySelector('span')
    return span
        ? span.textContent.toLowerCase().trim()
        : cell.textContent.toLowerCase().trim()
}

const updateRowVisibility = (searchValue) => {
    const rows = document.querySelectorAll(
        '.table__body--deselected .table__row'
    )

    rows.forEach((row) => {
        if (row.id === '1') {
            row.style.display = ''
            return
        }

        const cell = row.querySelector('.table__cell')
        const cellText = cell ? getCellText(cell) : ''

        row.style.display = cellText.startsWith(searchValue) ? '' : 'none'
    })
}

inputSearch.addEventListener('input', (event) => {
    const searchValue = event.target.value.toLowerCase()
    updateRowVisibility(searchValue)
})

inputSearch.addEventListener('focus', () => {
    table.scrollIntoView({ behavior: 'smooth', block: 'start' })
})

buttonDelete.addEventListener('click', () => {
    inputSearch.value = ''
    updateRowVisibility('')
    table.scrollIntoView({ behavior: 'smooth', block: 'start' })
})

const buttonAddNew = document.querySelector('.table__button--new')
const baseNode = document.getElementById('67')

buttonAddNew.addEventListener('click', () => {
    if (inputSearch.value.trim().length > 0) {
        const newNode = baseNode.cloneNode(true)
        newNode.removeAttribute('id')
        newNode.firstElementChild.textContent = inputSearch.value
        selectedTable.appendChild(newNode)
        inputSearch.value = ''
        updateRowVisibility('')
        inputSearch.focus()
    }

    

})
