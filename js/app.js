const menuButton = document.querySelector('.header__menu-button')
const navMenu = document.querySelector('.nav__list:first-child')
const navItem = document.querySelectorAll('.nav__list:first-child .nav__link')

menuButton.addEventListener('click', () =>
    navMenu.classList.toggle('nav__list--show')
)

navItem.forEach((item) => {
    item.addEventListener('click', () => {
        if (navMenu.classList.contains('nav__list--show'))
            navMenu.classList.remove('nav__list--show')
    })
})

document.addEventListener('click', (e) => {
    if (![navMenu, menuButton].some((element) => element.contains(e.target)))
        navMenu.classList.remove('nav__list--show')
})

window.addEventListener('scroll', () => {
    if (navMenu.classList.contains('nav__list--show'))
        navMenu.classList.remove('nav__list--show')
})
