async function loadMenu() {
  const res = await fetch('menu.json');
  const data = await res.json();

  const categoriesEl = document.getElementById('categories');
  const menuEl = document.getElementById('menu');

  let currentCategory = data[0].category;

  function renderMenu() {
    menuEl.innerHTML = '';
    const cat = data.find(c => c.category === currentCategory);
    cat.items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'border border-white/10 rounded p-4 bg-white/5';
      div.innerHTML = `<div class="text-lg font-semibold">${item.name}</div><div class="text-sm text-white/70">${item.price} ₽</div>`;
      menuEl.appendChild(div);
    });
  }

  data.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat.category;
    btn.className = 'px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition';
    btn.onclick = () => {
      currentCategory = cat.category;
      renderMenu();
    };
    categoriesEl.appendChild(btn);
  });

  renderMenu();
}

loadMenu();
