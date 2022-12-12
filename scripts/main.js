window.onload = () => {
    let menuButton = document.getElementById(`menu`);
    let nav = document.querySelector(`nav`);
    let modalButton = document.getElementById(`modal`);
    let modalPanel = document.querySelector(`.modal-panel`);
    let modalWhite = document.querySelector(`.modal-content-pane`);

    //toggling between hidding and showing the menu when clicked
    menuButton.addEventListener(`click`, () => {
        nav.classList.toggle(`hidden`);
    });
    //displays the modal when user clicks `show modal`
    modalButton.addEventListener(`click`, () => {
        modalPanel.style.display =`block`;
        modalWhite.style.display =`block`;
    });
    //remove the modal when esc button is clicked
    window.addEventListener(`keydown`, (event) => {
        if (event.key ===`Escape`) {
            modalPanel.style.display =`none`;
        }
    });
};
