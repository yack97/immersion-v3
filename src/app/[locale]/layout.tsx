import type { Metadata } from "next";
import "../globals.css"; // Mantén el CSS global
import { NextIntlClientProvider } from 'next-intl'; // Proveedor de internacionalización
import { getMessages } from 'next-intl/server'; // Obtención de mensajes
import Navbar from '@/components/Navbar'; // Componente Navbar

// Metadatos optimizados
export const metadata: Metadata = {
  title: "Immersion Agency - Estrategias Digitales Personalizadas",
  description: "Creamos estrategias digitales personalizadas que impulsan tu negocio.",
  keywords: "Marketing Digital, Desarrollo Web, UX/UI, SEO, SEM, Producción Audiovisual",
  authors: [{ name: "Immersion Agency", url: "https://www.immersionagency.com" }],
  robots: "index, follow",
  openGraph: {
    title: "Immersion Agency - Estrategias Digitales",
    description: "Desarrollamos estrategias digitales a medida que impulsan tu negocio.",
    type: "website",
    url: "https://www.immersionagency.com",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FLOGO%20REDUCCION%20NEGATIVO.svg?alt=media&token=383bd9fc-02d5-4084-8614-15c7ce35bdd2"
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Immersion Agency",
    description: "Transformamos datos en estrategias para el crecimiento digital.",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FLOGO%20REDUCCION%20NEGATIVO.svg?alt=media&token=383bd9fc-02d5-4084-8614-15c7ce35bdd2"
    ]
  },
  icons: {
    icon: "/favicon.ico",
    apple: "https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FLOGO%20REDUCCION%20NEGATIVO.svg?alt=media&token=383bd9fc-02d5-4084-8614-15c7ce35bdd2"
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode; // Definición del tipo de children
  params: { locale: string }; // Definición del tipo de params
}) {
  // Obtiene los mensajes basados en el locale
  let messages;
  try {
    messages = await getMessages({ locale }); // Pasa un objeto con el locale
  } catch (error) {
    console.error("Error fetching messages:", error);
    messages = {}; // Mensajes predeterminados (vacío o definido)
  }

  return (
    <html lang={locale}>
      <head>
        {/* Preload para recursos críticos */}
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FLOGO%20REDUCCION%20NEGATIVO.svg?alt=media&token=383bd9fc-02d5-4084-8614-15c7ce35bdd2" as="image" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children} {/* Renderiza los hijos dentro del proveedor de internacionalización */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}