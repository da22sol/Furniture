const sideMenuBar = document.getElementById('side_menu_bar');
const sideMenuBarBtn = document.getElementsByClassName('headicon icon_menu')[0];
const sideMenuBarXBtn = document.getElementsByClassName('x_btn')[0];
const sideMenuBarRigthBox = document.getElementsByClassName('right_box')[0];
const sideMenuBarLoginBtn = document.getElementsByClassName('login_btn')[0];
const sideMenuBarRegisterBtn =
    document.getElementsByClassName('register_btn')[0];

sideMenuBarBtn.addEventListener('click', () => {
    sideMenuBar.style.display = 'flex';
});

sideMenuBarXBtn.addEventListener('click', () => {
    sideMenuBar.style.display = 'none';
});

sideMenuBarRigthBox.addEventListener('click', () => {
    sideMenuBar.style.display = 'none';
});

sideMenuBarLoginBtn.addEventListener('click', () => {
    location.href = '/html/login.html';
});

sideMenuBarRegisterBtn.addEventListener('click', () => {
    location.href = '/html/register.html';
});
