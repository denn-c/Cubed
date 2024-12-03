const hamburger = document.querySelector('.header__hamburger')
const navMenu = document.querySelector('.nav__list:first-child')

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('nav__list--show')
})

document.addEventListener('click', (e) => {
    if (![navMenu, hamburger].some((element) => element.contains(e.target))) {
        navMenu.classList.remove('nav__list--show')
    }
})
