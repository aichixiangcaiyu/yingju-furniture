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
