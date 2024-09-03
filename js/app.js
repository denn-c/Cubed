const hamburger = document.querySelector('.header__hamburger')
const logo = document.querySelector('.nav__logo')
const drawerMenu = document.querySelector('.nav__list:nth-child(2)')

hamburger.addEventListener('click', () => {
    drawerMenu.classList.toggle('nav__list--show')
    logo.classList.toggle('nav__logo--active')
});


document.addEventListener('click', (e) => {
    if (!drawerMenu.contains(e.target) && !hamburger.contains(e.target)) {
        drawerMenu.classList.remove('nav__list--show');
        logo.classList.remove('nav__logo--active')
        
    }
});