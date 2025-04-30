export const getLang = () => {
  const cacheLang = localStorage.getItem('lang');
  const navigatorLang = navigator.language.startsWith('zh') ? 'zh' : 'en';
  return cacheLang || navigatorLang;
}
