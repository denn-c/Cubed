const hamburger = document.querySelector('.header__hamburger')
const navMenu = document.querySelector('.nav__list:first-child')
const navItem = document.querySelectorAll('.nav__list:first-child .item__link')

hamburger.addEventListener('click', () =>
    navMenu.classList.toggle('nav__list--show')
)

navItem.forEach((item) =>
    item.addEventListener('click', () =>
        navMenu.classList.remove('nav__list--show')
    )
)

document.addEventListener('click', (e) => {
    if (![navMenu, hamburger].some((element) => element.contains(e.target)))
        navMenu.classList.remove('nav__list--show')
})

