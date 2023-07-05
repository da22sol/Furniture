const sideMenuBar = document.getElementById("side_menu_bar");
const sideMenuBarBtn = document.getElementsByClassName("headicon icon_menu")[0];
const sideMenuBarXBtn = document.getElementsByClassName("x_btn")[0];
const sideMenuBarRigthBox = document.getElementsByClassName("right_box")[0];

sideMenuBarBtn.addEventListener("click", function () {
    sideMenuBar.style.display = "flex";
});

sideMenuBarXBtn.addEventListener("click", function () {
    sideMenuBar.style.display = "none";
});

sideMenuBarRigthBox.addEventListener("click", function () {
    sideMenuBar.style.display = "none";
});

export default {
    sideMenuBar,
    sideMenuBarBtn,
    sideMenuBarXBtn,
    sideMenuBarRigthBox,
};
