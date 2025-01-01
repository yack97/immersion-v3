// src/components/Footer.tsx

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations(); // Hook para traducción

    return (
        <footer className="w-full shadow dark:bg-black m-0">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://immersion.com.ar/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <div className="relative">
                            <Image
                                alt="Immersion logo"
                                src="https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FGroup%20(1).svg?alt=media&token=f5cb6700-36a5-4511-90b4-c7f6d34096de"
                                width={200}
                                height={200}
                            />
                        </div>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a
                                href="https://www.instagram.com/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                            >
                                <Image
                                    src="https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2Frb_136728.png?alt=media&token=0e03190b-af54-4b75-8442-61752ef980ea"
                                    alt="Instagram icon"
                                    width={35}
                                    height={35}
                                    className="mr-2"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2024 <a href="https://immersion.com.ar/" className="hover:underline">Immersion™</a>. {t('footer.allRightsReserved')}
                </span>
            </div>
        </footer>
    );
}