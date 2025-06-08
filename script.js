// Минимальная интерактивная логика меню

// Подсветка выбранных кнопок
function toggleButtonActive(buttonGroupSelector) {
  document.querySelectorAll(buttonGroupSelector).forEach(group => {
    group.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        [...group.children].forEach(btn => btn.classList.remove('bg-white', 'text-black'));
        e.target.classList.add('bg-white', 'text-black');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Группы переключателей
  toggleButtonActive('.milk-options');
  toggleButtonActive('.volume-options');
  toggleButtonActive('.syrup-options');
  toggleButtonActive('.place-options');
  toggleButtonActive('.sugar-options');

  // Счётчик количества
  const minus = document.querySelector('#minus');
  const plus = document.querySelector('#plus');
  const qty = document.querySelector('#quantity');

  let count = 1;
  qty.textContent = count;

  minus.addEventListener('click', () => {
    if (count > 1) qty.textContent = --count;
  });

  plus.addEventListener('click', () => {
    qty.textContent = ++count;
  });

  // Кнопка "Добавить в заказ"
  const addButton = document.querySelector('#add-to-order');
  addButton.addEventListener('click', () => {
    const milk = document.querySelector('.milk-options .bg-white')?.textContent.trim();
    const volume = document.querySelector('.volume-options .bg-white')?.textContent.trim();
    const syrup = document.querySelector('.syrup-options .bg-white')?.textContent.trim();
    const place = document.querySelector('.place-options .bg-white')?.textContent.trim();
    const sugar = document.querySelector('.sugar-options .bg-white')?.textContent.trim();

    const order = {
      напиток: 'Капучино',
      молоко: milk,
      объём: volume,
      сироп: syrup,
      где: place,
      сахар: sugar,
      количество: count
    };

    console.log('🛒 Заказ:', order);
    alert('Заказ добавлен в консоль!');
  });
});
