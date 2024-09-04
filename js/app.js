const hamburger = document.querySelector(".header__hamburger");
const logo = document.querySelector(".nav__logo");
const drawerMenu = document.querySelector(".nav__list:nth-child(2)");

const blockName = document.querySelector(".name__title");
const listName = document.querySelector(".name__list");
const nameOptions = [...listName.children];

hamburger.addEventListener("click", () => {
    drawerMenu.classList.toggle("nav__list--show");
    logo.classList.toggle("nav__logo--active");
});

document.addEventListener("click", (e) => {
    if (!drawerMenu.contains(e.target) && !hamburger.contains(e.target)) {
        drawerMenu.classList.remove("nav__list--show");
        logo.classList.remove("nav__logo--active");
    }
});

blockName.addEventListener("click", () => {
    listName.classList.toggle("name__list--show");
});

listName.addEventListener("click", (e) => {
    const selectedOption = e.target;
    if (selectedOption.tagName === "LI") {
        const previouslySelected = listName.querySelector(
            ".list__text--selected"
        );
        if (previouslySelected) 
            previouslySelected.classList.remove("list__text--selected");
        
        blockName.textContent = selectedOption.textContent;
        selectedOption.classList.add("list__text--selected");
        listName.classList.remove("name__list--show");
    }
});
