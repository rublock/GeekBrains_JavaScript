'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function () {
  fitlerPopup.classList.toggle('hidden');
  fitlerLabel.classList.toggle('filterLabelPink');
  filterIcon.classList.toggle('filterIconPink');

  if (filterIcon.getAttribute('src') === 'images/filter.svg') {
    filterIcon.setAttribute('src', 'images/filterHover.svg');
  } else {
    filterIcon.setAttribute('src', 'images/filter.svg');
  }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function (header) {
  header.addEventListener('click', function (event) {
    event.target.nextElementSibling.classList.toggle('hidden');
  });
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function () {
  filterSizes.classList.toggle('hidden');
});

//replace to homework.js

let basket = [];
let checkArr = [];

document
  .querySelector('.featured.container')
  .addEventListener('click', (event) => {
    if (!event.target.classList.contains('btn')) {
      //ПРОВЕРЯЕМ ЧТО КЛИКНУЛИ НА ИМЕННО НА НАШУ КНОПКУ
      return;
    } else {
      let clickNum = +event.target.classList[1];
      //ЕСЛИ ДА, ТО БЕРЕМ ВСЕ ЭЛЕМЕНТЫ В КОНТЕЙНЕРЕ featuredData ИСПОЛЬЗУЕМ ДЕЛЕГИРОВАНИЕ
      const featuredDataEl = document.querySelectorAll('.featuredData');
      for (let i = 0; i < featuredDataEl.length; i++) {
        if (clickNum === i) {
          //БЕЖИМ ПО ЭЛЕМЕНТАМ ПОКА НЕ НАЙДЕМ НАШ
          const element = featuredDataEl[i];
          if (basket.length === 0 || !checkArr.includes(clickNum)) {
            //ЕСЛИ МАССИВ ПУСТОЙ ИЛИ ЭТОТ ЭЛЕМЕНТ УЖЕ ЕСТЬ, ТО СОЗДАТЬ НОВУЮ ЗАПИСЬ В МАССИВЕ
            basket.push({
              id: i,
              name: element.children[0].innerHTML,
              price: +element.children[2].innerHTML.slice(1),
              count: 1,
            });
            //ДОБАВЛЯЕМ ДАННЫЕ В МАССИВ ДЛЯ БУДУЩЕЙ ПРОВЕРКИ
            basket.forEach((elem) => {
              checkArr.push(elem.id);
            });
          } else {
            //ИНАЧЕ, ЕСЛИ МАССИВ НЕ ПУСТОЙ, ТО ЭЛЕМЕНТ НА КОТОРЫЙ МЫ КЛИКНУЛИ ПРИБАВИТЬ COUNT
            for (let j = 0; j < basket.length; j++) {
              if (basket[j].id === clickNum) {
                basket[j].count++;
                break;
              }
            }
          }
        }
      }
    }
    console.log(basket);
  });
