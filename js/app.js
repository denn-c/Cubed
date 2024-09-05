const hamburger = document.querySelector(".header__hamburger");
const logo = document.querySelector(".nav__logo");
const drawerMenu = document.querySelector(".nav__list:nth-child(2)");

const blockName = document.querySelector(".name__title");
const listName = document.querySelector(".name__list");

const toggleClass = (element, className) => element.classList.toggle(className);
const removeClass = (element, className) => element.classList.remove(className);
const handleOutsideClick = (target, elements, callback) => {
    if (!elements.some((element) => element.contains(target))) {
        callback();
    }
};

hamburger.addEventListener("click", () => {
    toggleClass(drawerMenu, "nav__list--show");
    toggleClass(logo, "nav__logo--active");
});

document.addEventListener("click", (e) => {
    handleOutsideClick(e.target, [drawerMenu, hamburger], () => {
        removeClass(drawerMenu, "nav__list--show");
        removeClass(logo, "nav__logo--active");
    });
});

listName.addEventListener("click", (e) => {
    const selectedOption = e.target;
    if (selectedOption.tagName === "LI") {
        const previouslySelected = listName.querySelector(
            ".list__text--selected"
        );
        if (previouslySelected)
            removeClass(previouslySelected, "list__text--selected");

        blockName.textContent = selectedOption.textContent;
        selectedOption.classList.add("list__text--selected");
        removeClass(listName, "name__list--show");
        removeClass(blockName, "name__title--show");
    }
});

blockName.addEventListener("click", () => {
    toggleClass(blockName, "name__title--show");
    toggleClass(listName, "name__list--show");
});

document.addEventListener("click", (e) => {
    handleOutsideClick(e.target, [listName, blockName], () => {
        removeClass(listName, "name__list--show");
        removeClass(blockName, "name__title--show");
    });
});
