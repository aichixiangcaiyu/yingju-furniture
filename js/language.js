(() => {
  const originalHost = 'www.yingjufurniture.com';
  const translateHost = 'www-yingjufurniture-com.translate.goog';
  const translateParams = ['_x_tr_sl', '_x_tr_tl', '_x_tr_hl', '_x_tr_pto'];

  const cleanPath = () => {
    const path = window.location.pathname || '/';
    const params = new URLSearchParams(window.location.search);
    translateParams.forEach(name => params.delete(name));
    const query = params.toString();
    return `${path}${query ? `?${query}` : ''}${window.location.hash || ''}`;
  };

  const translatedUrl = language => {
    const path = cleanPath();
    if (language === 'en') {
      return `https://${originalHost}${path}`;
    }

    const separator = path.includes('?') ? '&' : '?';
    return `https://${translateHost}${path}${separator}_x_tr_sl=en&_x_tr_tl=${encodeURIComponent(language)}&_x_tr_hl=en&_x_tr_pto=wapp`;
  };

  const activeLanguage = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('_x_tr_tl') || 'en';
  };

  document.querySelectorAll('[data-language-select]').forEach(select => {
    const active = activeLanguage();
    if ([...select.options].some(option => option.value === active)) {
      select.value = active;
    }

    select.addEventListener('change', event => {
      window.location.href = translatedUrl(event.target.value);
    });
  });
})();
