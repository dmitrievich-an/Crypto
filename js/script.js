const headerNavBtn = document.querySelector(".header__navigation-button");
const headerNavigation = document.querySelector(".header__navigation");

headerNavBtn.addEventListener('click', () => {
  headerNavigation.classList.toggle('header__navigation_open')
})