// Функції - генератори

function* myGenerator() {
  ///
  yield 1;
  ///
  yield 2;
  ///
  yield 3;
}

const gen = myGenerator();



function* mySecondGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const gen2 = mySecondGenerator(1, 5);

function* myThirdGenerator() {
  let value = yield;
  console.log(value);
}

const gen3 = myThirdGenerator();

gen3.next(); // запускає генератор

gen3.next(); // передає значення у генератор


// Ітератори 

/*

Ітератор - об'єкт, за допомогою якого можна перебирати структури не знаючи їх 
внутрішнього влаштування.

Ітератор має:
метод next() - повертає наступний метод колекції
властивість done - чи завершили ми обхів чи ні

*/

const numbers = [1, 2, 3, 4, 5];

const iterator = numbers[Symbol.iterator]();

iterator.next(); // Отримати наступний елемент

// iterator.next();
// {value: 1, done: false}
// iterator.next();
// {value: 2, done: false}
// iterator.next();
// {value: 3, done: false}
// iterator.next();
// {value: 4, done: false}
// iterator.next();
// {value: 5, done: false}
// iterator.next();
// {value: undefined, done: true} - обхід завершено

// customIterator

const myIterator = {
  data: [1, 2, 3, 4, 5],
  currentIndex: 0,
  next() {
    if (this.currentIndex < this.data.length) {
      return {
        value: this.data[this.currentIndex++],
        done: false
      }
    } else {
      return {
        value: undefined,
        done: true
      }
    }
  }
}





// ДЗ
/* 
 
Написати функцію-генератор, яка генерує числа від 0 до 100.
З кожним викликом число інкрементується на 1.
 
За допомогою написаного генератора, потрібно знайти суму чисел від 0 до 100.
(5050)
 
*/

function* numberGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const iter = numberGenerator(0, 100);
let sum = 0;
for (let i = 0; i <= 100; i++) {
  const {value} = iter.next();
  sum += value;
}

// 5050