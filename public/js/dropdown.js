const optionButtons = document.querySelectorAll(".item-options");
const dropdownMenus = document.querySelectorAll(".dropdown");

optionButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        event.stopPropagation();

        const menu = button.nextElementSibling;

        dropdownMenus.forEach(dropdown => {
            if (dropdown !== menu) {
                dropdown.classList.add("hidden");
            }
        });

        menu.classList.toggle("hidden");
    });
});

document.addEventListener("click", () => {
    dropdownMenus.forEach(menu => {
        menu.classList.add("hidden");
    });
});
console.log(dropdownMenus);