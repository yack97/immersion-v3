import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// Define el tipo permitido de locales
type Locale = 'en' | 'es';

export default getRequestConfig(async ({ locale }) => {
  // Validar que el parámetro `locale` entrante sea válido y que sea del tipo correcto
  if (!routing.locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});