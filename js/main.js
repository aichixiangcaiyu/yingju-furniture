// Preselect product category when arriving from a product page (?product=...)
(function () {
  try {
    var params = new URLSearchParams(window.location.search);
    var wanted = params.get('product');
    var select = document.querySelector('#quote-form select[name="product"]');
    if (wanted && select) {
      for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].text === wanted) { select.selectedIndex = i; break; }
      }
    }
  } catch (e) {}
})();


const catalogFilters = document.querySelectorAll('[data-category-filter]');
const catalogCards = document.querySelectorAll('.catalog-card[data-category]');
const catalogCount = document.querySelector('.catalog-count');

if (catalogFilters.length && catalogCards.length) {
  catalogFilters.forEach(button => {
    button.addEventListener('click', () => {
      const selected = button.dataset.categoryFilter;
      let visible = 0;

      catalogFilters.forEach(item => item.classList.toggle('active', item === button));

      catalogCards.forEach(card => {
        const show = selected === 'all' || card.dataset.category === selected;
        card.hidden = !show;
        if (show) visible += 1;
      });

      if (catalogCount) {
        const label = button.childNodes[0].textContent.trim();
        catalogCount.textContent = selected === 'all'
          ? `${visible} products imported`
          : `${visible} products in ${label}`;
      }
    });
  });
}
