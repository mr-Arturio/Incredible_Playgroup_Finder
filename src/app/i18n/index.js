import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getOptions } from './settings'; // Ensure this file exists and exports getOptions

const i18nInstance = createInstance();

async function initI18next(lng, ns) {
  await i18nInstance
    .use(initReactI18next) // Ensure initReactI18next is imported correctly
    .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns));

  return i18nInstance;
}

export async function useTranslation(lng, ns, options = {}) {
  const i18nextInstance = await initI18next(lng, ns);
  
  // Ensure getFixedT method exists in i18nextInstance
  if (i18nextInstance && typeof i18nextInstance.getFixedT === 'function') {
    return {
      t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
      i18n: i18nextInstance,
    };
  } else {
    throw new Error('Failed to initialize i18next instance');
  }
}
