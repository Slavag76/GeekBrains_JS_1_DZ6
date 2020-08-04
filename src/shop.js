// исходный массив товаров, на основе которых генерируется каталог
let products = [
    {
        name: 'processor',
        price: 340,
        id: '1'
    },
    {
        name: 'monitor',
        price: 270,
        id: '2'
    },
    {
        name: 'mouse',
        price: 120,
        id: '3'
    },
    {
        name: 'keyboard',
        price: 80,
        id: '4'
    },
    {
        name: 'microphone',
        price: 40,
        id: '5'
    }
]

// массив, в который будут добавляться купленные товары (корзина)
let basketProducts = [];

let catalog = document.querySelector('.catalog');
let basket = document.querySelector('.basket');


// функция, возвращает строку с версткой для одного товара в каталоге
function createProduct(item) {
    let prod = `
        <div class='product'>
            <h2>${item.name}</h2>
            <p>${item.price}</p>
            <button data-id=${item.id}>Купить</button>
        </div>
    `; // строка с версткой для товара в каталоге
    return prod; // возвращаем строку с версткой
}

// функция, отрисовывает каталог. Проходит в цикле по массиву с товарами и 
// для каждого товара вызывает функцию createProduct, добавляет верстку товаров в каталог
function createCatalog(items) {
    for (let i = 0; i < items.length; i++) { // запускаем цикл по массиву товаров каталога
        catalog.insertAdjacentHTML('beforeend', createProduct(items[i])); // на каждой итерации добавляем верстку каждого товара в каталог (в DOM)
    }
}

// функция возвращает строку с версткой для одного товара в корзине
function createBasketProduct(item) {
    let basketProd = `
        <div class='basketProduct'>
            <h2>${item.name}</h2>
            <p>Цена: ${item.price}</p>
        </div>
    `; // строка с версткой для товара в корзине
    return basketProd; // возвращаем эту строку
}

// функция отрисовывает корзину. Если в корзине товаров нет (массив basketProducts пустой),
// тогда в корзину добавляется сообщение "Корзина пуста".
// Если же в массиве basketProducts что-то есть, тогда функция в цикле проходится по
// массиву basketProducts, считает общую стоимость товаров в корзине и количество,
// а также для каждого товара вызывает функцию createBasketProduct, которая возвращает верстку
// для каждого товара.
// При помощи метода innerHTML в DOM вставляет верстку всей корзины.
// Подключает обработчик события для кнопки "Оформить заказ"
function createBasket(items) {
    if (items.length === 0) { // проверяем есть ли что-то в корзине
        basket.innerHTML = `<div class='basketMessage'>Корзина пуста</div>` // выводим "корзина пуста"
    } else {
        let cost = 0;
        let amount = 0;
        let basketProducts = ''; // сюда будем сохранять верстку товаров (строку)
        for (let i = 0; i < items.length; i++) { // проходимся по массиву товаров корзины
            amount += 1; // увеличиваем счетчик количества товаров
            cost += items[i].price; // увеличиваем общую стоимость
            basketProducts += createBasketProduct(items[i]); // дописываем верстку для товара
        }
        basket.innerHTML = `
            <div class='basketMessage'>Количество: ${amount}, стоимость: ${cost}</div>
            <div class='basketProducts'>
                ${basketProducts}
            </div>
            <button id='order'>Оформить заказ</button>
        `; // Подключаем верстку корзины в DOM
        let order = document.querySelector('#order'); // обращаемся к кнопке оформления заказа
        order.addEventListener('click', function() { // вешаем обработчик для оформления заказа
            if (basket.querySelector('#orderMessage')) { // проверяем есть ли уже в DOM элемент #orderMessage
                // basket.querySelector('#orderMessage').innerText = `С Вас ${cost} рублей`;
                return // если есть, тогда завершаем работу функции (это нужно, чтобы повторно не выводить сообщения при последующих нажатиях)
            } else {
                basket.insertAdjacentHTML('beforeend', `<p id='orderMessage'>С Вас ${cost} рублей</p>`) // если нет, тогда создаем элемент
            }
        })
    }
}

// отрисовываем каталог, отрисовываем корзину первый раз
createCatalog(products);
createBasket(basketProducts);

// функция для добавления товаров в корзину. event - позволяет обратиться к событию
function addProd(event) {
    if (!event.target.dataset.id) { // проверяем, что мы кликнули не по кнопке "купить"
        return; // завершаем работу функции, если это не так
    }
    for(let i = 0; i < products.length; i++) { // если клик по кнопке купить, проходимся в цикле по массиву продуктов в каталоге
        if (event.target.dataset.id == products[i].id) { // если id (data-id) кнопки совпадают с id текущего товара
            basketProducts.push(products[i]); // добавляем этот товар в массив товаров корзины
        }
    }
    createBasket(basketProducts); // запускаем отрисовку корзины
}

catalog.addEventListener('click', addProd) // вешаем обработчик клика на каталог



