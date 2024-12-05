const phone = document.getElementById('phone')

const cellAmount = document.querySelectorAll('.table__cell:nth-child(2)')

phone.addEventListener(
    'input',
    () => (phone.value = phone.value.replace(/[^0-9]/g, ''))
)

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
