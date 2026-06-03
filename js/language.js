(() => {
  const originalHost = 'www.yingjufurniture.com';
  const localPages = {
    en: '/',
    'zh-CN': '/zh-cn.html',
    fr: '/fr.html',
    de: '/de.html',
    es: '/es.html',
    ja: '/ja.html',
    ko: '/ko.html',
    ru: '/ru.html'
  };

  const activeLanguage = () => {
    const path = window.location.pathname || '/';
    const match = Object.entries(localPages).find(([, page]) => page !== '/' && path.endsWith(page));
    return match ? match[0] : 'en';
  };

  document.querySelectorAll('[data-language-select]').forEach(select => {
    const active = activeLanguage();
    if ([...select.options].some(option => option.value === active)) {
      select.value = active;
    }

    select.addEventListener('change', event => {
      const page = localPages[event.target.value] || '/';
      window.location.href = `https://${originalHost}${page}`;
    });
  });
})();
