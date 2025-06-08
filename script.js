// Минимальная интерактивная логика меню

// Подсветка выбранных кнопок
function toggleButtonActive(buttonGroupSelector, allowToggleOff = false) {
  document.querySelectorAll(buttonGroupSelector).forEach(group => {
    group.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        if (allowToggleOff && e.target.classList.contains('bg-white')) {
          e.target.classList.remove('bg-white', 'text-black');
          return;
        }
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
      if (volume && btn.dataset.volume === volume) {
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

  // Выбор объёма в списке напитков
  document.querySelectorAll('.price-options').forEach(group => {
    group.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        const row = group.closest('[data-drink]');
        if (e.target.classList.contains('bg-white')) {
          e.target.classList.remove('bg-white', 'text-black');
          if (row) delete selectedVolumes[row.dataset.drink];
          return;
        }
        [...group.children].forEach(btn => btn.classList.remove('bg-white', 'text-black'));
        e.target.classList.add('bg-white', 'text-black');
        if (row) selectedVolumes[row.dataset.drink] = e.target.dataset.volume;
      }
    });
  });

  // Группы переключателей
  toggleButtonActive('.milk-options');
  toggleButtonActive('.volume-options');
  toggleButtonActive('.syrup-options');
  toggleButtonActive('.place-options');

  // Сохранение объёма из подменю
  document.querySelector('.volume-options').addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON' && currentDrink) {
      selectedVolumes[currentDrink] = e.target.dataset.volume;
    }
  });

  // Счётчик сахара
  const sugarMinus = document.querySelector('#sugar-minus');
  const sugarPlus = document.querySelector('#sugar-plus');
  const sugarQty = document.querySelector('#sugar-count');

  let sugarCount = 1;
  sugarQty.textContent = sugarCount;

  sugarMinus.addEventListener('click', () => {
    if (sugarCount > 0) sugarQty.textContent = --sugarCount;
  });

  sugarPlus.addEventListener('click', () => {
    sugarQty.textContent = ++sugarCount;
  });

  // Счётчик порций
  const portionMinus = document.querySelector('#portion-minus');
  const portionPlus = document.querySelector('#portion-plus');
  const portionQty = document.querySelector('#portion-quantity');

  let count = 1;
  portionQty.textContent = count;

  portionMinus.addEventListener('click', () => {
    if (count > 1) portionQty.textContent = --count;
  });

  portionPlus.addEventListener('click', () => {
    portionQty.textContent = ++count;
  });

  // Пролистывание списка сиропов
  const syrupContainer = document.querySelector('.syrup-options');
  document.getElementById('syrup-left')?.addEventListener('click', () => {
    syrupContainer.scrollBy({ left: -100, behavior: 'smooth' });
  });
  document.getElementById('syrup-right')?.addEventListener('click', () => {
    syrupContainer.scrollBy({ left: 100, behavior: 'smooth' });
  });

  // Кнопка "Добавить в заказ"
  const addButton = document.querySelector('#add-to-order');
  addButton.addEventListener('click', () => {
    const milk = document.querySelector('.milk-options .bg-white')?.textContent.trim();
    const volume = document.querySelector('.volume-options .bg-white')?.textContent.trim();
    const syrup = document.querySelector('.syrup-options .bg-white')?.textContent.trim();
    const place = document.querySelector('.place-options .bg-white')?.textContent.trim();
    const sugar = sugarQty.textContent;

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
      порции: count
    };

    console.log('🛒 Заказ:', order);
    alert('Заказ добавлен в консоль!');
  });
});
