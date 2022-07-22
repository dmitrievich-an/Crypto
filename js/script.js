//Header menu
const headerNavBtn = document.querySelector(".header__navigation-button");
const headerNavigation = document.querySelector(".header__navigation");

headerNavBtn.addEventListener('click', () => {
  headerNavigation.classList.toggle('header__navigation_open')
});

//Modal window
const heroBtn = document.querySelector(".hero__button");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

heroBtn.addEventListener('click', () => {
  overlay.classList.add('overlay_open');
  modal.classList.add('modal_open');
});

overlay.style.transitionDuration = '0.3s';
modal.style.transitionDuration = '0.3s';

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


//Tabs
const advantageButtons = document.querySelectorAll('.advantage__button');
const advantageItemsContent = document.querySelectorAll('.advantage__item-content');

advantageButtons.forEach((advantageButton, i) => {
  advantageButton.addEventListener('click', () => {
    advantageItemsContent.forEach((advantageItemContent, j) => {
      if (i === j) {
        advantageButtons[j].classList.add('advantage__button_active');
        advantageItemsContent[j].classList.add('advantage__item-content_active');
      } else {
        advantageButtons[j].classList.remove('advantage__button_active');
        advantageItemsContent[j].classList.remove('advantage__item-content_active');
      }
    })
  })
})

//Exchange rates
const exchangeRatesList = document.querySelector('.exchange-rates__list');

const socket = new WebSocket('ws://web-socket-current.herokuapp.com');

const renderExchange = (wrapper, data) => {
  const {from, to, rate, change} = JSON.parse(data);
  // console.log(from, to, rate, change);

  const listItem = document.createElement('li');
  listItem.classList.add(
    'exchange-rates__item',
    change === 1 ? 'exchanges__item_up' : 'exchanges__item_down'
  );

  const currency = document.createElement('span');
  currency.classList.add('exchange-rates__currency');
  currency.textContent = `${from}/${to}`;

  const value = document.createElement('span');
  value.classList.add('exchange-rates__value');
  value.textContent = rate;

  listItem.append(currency, value);
  wrapper.prepend(listItem);

  if (wrapper.children.length > 4) {
    wrapper.children[4].remove();
  }
}

socket.addEventListener('message', event => {
  renderExchange(exchangeRatesList, event.data);
});

socket.addEventListener('error', err => {
  console.log(err)
})