const searchEl = document.querySelector(".icon_search");
const searchInputEl = searchEl.querySelector("input");

searchEl.addEventListener("click", function () {
    searchInputEl.focus();
});

export default { searchEl, searchInputEl };
