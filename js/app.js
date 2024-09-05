const hamburger = document.querySelector(".header__hamburger");
const logo = document.querySelector(".nav__logo");
const drawerMenu = document.querySelector(".nav__list:nth-child(2)");

const blockName = document.querySelector(".name__title");
const listName = document.querySelector(".name__list");

const editButton = document.getElementById("edit_button");
const sizeInputs = document.querySelectorAll(".input__input");

const blocks = {
    bloqueta: {
        name: "Bloqueta",
        image: "asset/images/bloqueta.png",
        long: 40,
        high: 20,
        width: 12,
    },
    kingKong: {
        name: "King Kong",
        image: "asset/images/king-kong.png",
        long: 24,
        high: 9,
        width: 12,
    },
    bloquer: {
        name: "Bloquer",
        image: "asset/images/bloquer.png",
        long: 28,
        high: 17,
        width: 12,
    },
    kingKong18Huecos: {
        name: "King Kong 18 huecos",
        image: "asset/images/king-kong-18-huecos.png",
        long: 24,
        high: 10,
        width: 14,
    },
    pandereta: {
        name: "Pandereta",
        image: "asset/images/pandereta.png",
        long: 23,
        high: 9,
        width: 11,
    },
};

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

editButton.addEventListener("click", () => {
    const isEditing = editButton.textContent.trim() === "Establecer";
    editButton.textContent = isEditing ? "Editar" : "Establecer";

    sizeInputs.forEach((input) => {
        input.disabled = !input.disabled;
        input.classList.toggle("block__input-active");
    });
    sizeInputs[0].focus();
    sizeInputs[0].select();
});
