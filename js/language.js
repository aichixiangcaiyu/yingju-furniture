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
    const englishPath = path.startsWith('/zh-cn.html') ? '/' : path;

    if (language === 'en') {
      return `https://${originalHost}${englishPath}`;
    }

    if (language === 'zh-CN') {
      return `https://${originalHost}/zh-cn.html`;
    }

    const separator = englishPath.includes('?') ? '&' : '?';
    return `https://${translateHost}${englishPath}${separator}_x_tr_sl=en&_x_tr_tl=${encodeURIComponent(language)}&_x_tr_hl=en&_x_tr_pto=wapp`;
  };

  const activeLanguage = () => {
    if (window.location.pathname.endsWith('/zh-cn.html')) {
      return 'zh-CN';
    }

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
