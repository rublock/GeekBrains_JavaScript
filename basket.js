'use strict';

const basketObj = {}; //объект для хранения состава корзины

const basketTotalValue = document.querySelector('.basketTotalValue'); //общая сумма
let countEl = document.querySelector('.count'); //красный счетчик
const basketEl = document.querySelector('.basket'); //вся корзина
const basketTotalEl = document.querySelector('.basketTotal');

//показываем корзину по клику
document.querySelector('.cartIconWrap').addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});

//обработчик всех кнопок положить в корзину
document.querySelector('.featuredItems').addEventListener('click', (event) => {
  if (!event.target.classList.contains('btn')) {
    return;
  }
  const id = +event.target.classList[1];
  const featuredDataEl = document.querySelectorAll('.featuredData');
  for (let i = 0; i < featuredDataEl.length; i++) {
    if (!id === i) {
      return;
    }
    const prodName = featuredDataEl[id].children[0].innerHTML;
    const price = +featuredDataEl[id].children[2].innerHTML.slice(1);
    addToBasket(id, prodName, price);
    break;
  }
  console.log(basketObj);
});

//сборщик объекта basketObj
function addToBasket(id, prodName, price) {
  if (!(id in basketObj)) {
    basketObj[id] = {
      id: id,
      name: prodName,
      price: price,
      count: 0,
    };
  }
  basketObj[id].count++;
  countEl.textContent = counAllProducts(id);
  basketTotalValue.textContent = totalSum();
  renderBasket(id);
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

//рендер товаров в корзине
function renderBasket(id) {
  const basketRowEl = basketEl.querySelector(
    `.basketRow[data-productId='${id}']`
  );
  if (!basketRowEl) {
    basketTotalEl.insertAdjacentHTML(
      'beforebegin',
      `
    <div class='basketRow' data-productId='${id}'>
      <div>${basketObj[id].name}</div>
      <div>
        <span class='productCount'>${basketObj[id].count}</span> шт.
      </div>
      <div>${basketObj[id].price}</div>
      <div>
        $<span class='productTotalRow'>${basketObj[id].price}</span>
      </div>
    </div>
    `
    );
  } else {
    const basketRowElAddNew = document.querySelector(
      `.basketRow[data-productId='${id}']`
    );
    basketRowElAddNew.querySelector('.productCount').textContent =
      basketObj[id].count;
    basketRowElAddNew.querySelector('.productTotalRow').textContent =
      basketObj[id].price * basketObj[id].count;
  }
}
