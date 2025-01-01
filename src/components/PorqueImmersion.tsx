// src/components/PorqueImmersion.tsx

import Image from "next/image";
import { useTranslations } from "next-intl";


export default function PorqueImmersion() {
    const t = useTranslations("porque");

    return (
        <div>
            {/* Contenedor principal que ocupa el 70% del ancho en pantallas grandes y 100% en pantallas pequeñas */}
            <div className="relative flex flex-col w-full sm:w-[80vw] mx-0 mt-8 items-center bg-purple-900 bg-opacity-10">
                <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 p-4">
                    <h2 className="font-semibold text-slate-50 text-4xl text-center mb-4">{t("whyImmersion")}</h2>

                    <div className="flex flex-col md:flex-row items-center text-slate-200">
                        {/* Lista de elementos */}
                        <ul className="md:w-2/3 mt-4 md:mt-0 md:ml-4">
                            <li>{t("uniqueCombination")}</li>
                            <li className="mt-8">{t("adaptToClientNeeds")}</li>
                        </ul>
                        {/* Imagen colocada al lado de la lista */}
                        <div className="flex flex-col items-center p-4 md:w-1/3">
                            <Image
                                src={'https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FVector.svg?alt=media&token=a974b079-d61a-4c18-94e5-ea92a16d60ee'}
                                width={300}
                                height={300}
                                className="mb-4"
                                alt="Imagen ilustrativa"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}