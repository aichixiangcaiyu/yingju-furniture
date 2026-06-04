const quoteForm = document.getElementById('quote-form');

if (quoteForm) {
  quoteForm.addEventListener('submit', event => {
    event.preventDefault();

    const data = new FormData(quoteForm);
    const lines = [
      'New project inquiry from Yingju Furniture website:',
      '',
      `Name: ${data.get('name') || ''}`,
      `Company: ${data.get('company') || ''}`,
      `Country: ${data.get('country') || ''}`,
      `Product: ${data.get('product') || ''}`,
      `Quantity: ${data.get('quantity') || ''}`,
      `Email: ${data.get('email') || ''}`,
      '',
      'Project Details:',
      data.get('details') || ''
    ];

    const subject = encodeURIComponent('Website inquiry - Yingju Furniture');
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:felix@yingjufurniture.com?subject=${subject}&body=${body}`;
  });
}


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
