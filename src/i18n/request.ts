import {getRequestConfig} from 'next-intl/server';
import {cookies,headers} from 'next/headers';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  // 从 cookie 中读取用户的语言偏好
  const cookieStore = await cookies();
  let locale = cookieStore.get('NEXT_LOCALE')?.value; // 默认英文
  if (!locale) {
    // Cookie没有，读取浏览器 Accept-Language
    const acceptLanguage = (await headers()).get('accept-language');
    if (acceptLanguage) {
      const firstLanguage = acceptLanguage.split(',')[0]; // 取第一个
      if (firstLanguage.startsWith('zh')) {
        locale = 'zh-CN';
      } else if (firstLanguage.startsWith('en')) {
        locale = 'en';
      }
    }
  }
  if (!locale) {
    locale = 'en'; // 最后兜底，防止为空
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
