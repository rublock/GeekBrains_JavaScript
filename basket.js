'use strict';

const basketObj = {}; //объект для хранения состава корзины

const basketTotalValue = document.querySelector('.basketTotalValue'); //общая сумма
let countEl = document.querySelector('.count'); //красный счетчик
const basketEl = document.querySelector('.basket'); //вся корзина

//показываем корзину по клику
document.querySelector('.cartIconWrap').addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});

//обработчик всех кнопок положить в корзину
document.querySelector('.featuredItems').addEventListener('click', (event) => {
  if (!event.target.classList.contains('btn')) {
    return;
  }
  const numClick = +event.target.classList[1];
  const featuredDataEl = document.querySelectorAll('.featuredData');
  for (let i = 0; i < featuredDataEl.length; i++) {
    if (!numClick === i) {
      return;
    }
    const prodName = featuredDataEl[numClick].children[0].innerHTML;
    const price = +featuredDataEl[numClick].children[2].innerHTML.slice(1);
    addToBasket(numClick, prodName, price);
    break;
  }
});

//сборщик объекта basketObj
function addToBasket(numClick, prodName, price) {
  if (!(numClick in basketObj)) {
    basketObj[numClick] = {
      id: numClick,
      name: prodName,
      price: price,
      count: 0,
    };
  }
  basketObj[numClick].count++;
  countEl.textContent = counAllProducts(numClick);
  basketTotalValue.textContent = totalSum();
}

//счетчик общего количества товаров в корзине (красный счетчик)
function counAllProducts() {
  const arr = [];
  Object.values(basketObj).forEach((elem) => {
    arr.push(elem.count);
  });
  return arr.reduce((a, b) => a + b, 0);
}

//счетчик общей суммы товаров в корзине в деньгах
function totalSum() {
  const arr = [];
  Object.values(basketObj).forEach((elem) => {
    arr.push(elem.price * elem.count);
  });
  return arr.reduce((a, b) => a + b, 0);
}
