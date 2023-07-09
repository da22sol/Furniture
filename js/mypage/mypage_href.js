const coupon = document.getElementsByClassName('coupon')[0];
const infoOrder = document.getElementsByClassName('info_order')[0];
const accountModify = document.getElementsByClassName('account_modify')[0];
const accountDelete = document.getElementsByClassName('account_delete')[0];

coupon.addEventListener('click', () => {
    location.href = '/';
});

infoOrder.addEventListener('click', () => {
    location.href = '/';
});

accountModify.addEventListener('click', () => {
    location.href = '/';
});

accountDelete.addEventListener('click', () => {
    location.href = '/';
});

export default {
    coupon,
    infoOrder,
    accountModify,
    accountDelete,
};
