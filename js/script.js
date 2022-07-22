const headerNavBtn = document.querySelector(".header__navigation-button");
const headerNavigation = document.querySelector(".header__navigation");
const heroBtn = document.querySelector(".hero__button");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

overlay.style.transitionDuration = '0.3s';
modal.style.transitionDuration = '0.3s';

headerNavBtn.addEventListener('click', () => {
  headerNavigation.classList.toggle('header__navigation_open')
});

heroBtn.addEventListener('click', () => {
  overlay.classList.add('overlay_open');
  modal.classList.add('modal_open');
});

overlay.addEventListener('click', (event) => {
  const target = event.target;
  if (target === overlay || target.closest('.modal__close')) {
    overlay.classList.remove('overlay_open');
    modal.classList.remove('modal_open');
  }
});

const form = document.querySelector('form');
const modalTitle = document.querySelector('.modal__title');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    name: form.firstname.value,
    surname: form.surname.value,
    tel: form.tel.value,
  };

  fetch('https://api-form-order.herokuapp.com/api/order', {
    method: 'post',
    body: JSON.stringify(data)
  }).then(response => response.json())
    .then(person => {
      modalTitle.textContent = `${person.name}, ваша заявка успешно отправлена. Номер заявки: ${person.id}`;
      form.remove();
      setTimeout(() => {
        overlay.classList.remove('overlay_open');
        modal.classList.remove('modal_open');
      }, 3000)
    });
});