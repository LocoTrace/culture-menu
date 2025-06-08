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
  // Открытие и закрытие подменю
  const drinkRows = document.querySelectorAll('.drink-row');
  const overlay = document.getElementById('drink-overlay');
  const menu = document.getElementById('drink-menu');
  const closeBtn = document.getElementById('close-overlay');

  const selectedVolumes = {};
  let currentDrink = '';

  function openMenu(row) {
    currentDrink = row.dataset.drink;
    const name = row.querySelector('span').textContent;
    menu.querySelector('h3').textContent = name;

    const volume = selectedVolumes[currentDrink];
    document.querySelectorAll('.volume-options button').forEach(btn => {
      btn.classList.remove('bg-white', 'text-black');
      if (volume ? btn.dataset.volume === volume : btn === document.querySelector('.volume-options button')) {
        btn.classList.add('bg-white', 'text-black');
      }
    });

    overlay.classList.remove('hidden');
    requestAnimationFrame(() => menu.classList.remove('translate-y-full'));
  }

  function closeMenu() {
    menu.classList.add('translate-y-full');
    setTimeout(() => overlay.classList.add('hidden'), 300);
  }

  drinkRows.forEach(row => row.addEventListener('click', () => openMenu(row)));
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', e => {
    if (e.target === overlay) closeMenu();
  });

  // Запоминание выбранного объёма в списке напитков
  document.querySelectorAll('.price-options').forEach(group => {
    group.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        const row = group.closest('[data-drink]');
        if (row) {
          selectedVolumes[row.dataset.drink] = e.target.dataset.volume;
        }
      }
    });
  });

  // Группы переключателей
  toggleButtonActive('.milk-options');
  toggleButtonActive('.volume-options');
  toggleButtonActive('.syrup-options');
  toggleButtonActive('.place-options');
  toggleButtonActive('.sugar-options');
  toggleButtonActive('.price-options');

  // Сохранение объёма из подменю
  document.querySelector('.volume-options').addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON' && currentDrink) {
      selectedVolumes[currentDrink] = e.target.dataset.volume;
    }
  });

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

    if (currentDrink) {
      selectedVolumes[currentDrink] = volume;
    }

    const order = {
      напиток: menu.querySelector('h3').textContent,
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
