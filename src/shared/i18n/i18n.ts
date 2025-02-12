import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import ru from './locales/ru';
import { flattenObject } from './flattenObject';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: flattenObject(en) },
        ru: { translation: flattenObject(ru) },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
});

export default i18n;
