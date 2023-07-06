/* MENU BUTTON */
const TOMENU = document.querySelector("#btn_menu");
const sideMenuBar = document.getElementById("side_menu_bar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        gsap.to(TOMENU, 0.5, {
            x: 0,
        });
    } else {
        gsap.to(TOMENU, 0.5, {
            x: 100,
        });
    }
});

TOMENU.addEventListener("click", () => {
    sideMenuBar.style.display = "flex";
});

/* TOP BUTTON */
const TOTOP = document.querySelector("#btn_top");
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        gsap.to(TOTOP, 0.5, {
            x: 0,
        });
    } else {
        gsap.to(TOTOP, 0.5, {
            x: 100,
        });
    }
});

TOTOP.addEventListener("click", () => {
    gsap.to(window, 0.7, {
        scrollTo: 0,
    });
});

export default {
    TOMENU,
    TOTOP,
};
