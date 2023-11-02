import { createI18n } from 'vue-i18n';

import { Locale } from '@/enums';

import enUS from './locales/en-us';

const messages = {
  'en-US': enUS
};



export default createI18n({
  legacy: false,  
  messages,
  fallbackLocale: Locale.EN_US
});
