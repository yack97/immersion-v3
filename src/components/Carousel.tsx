// components/Carousel.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const images = [
    {
        desktop: 'https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FImage-01-carousel%20(1).webp?alt=media&token=7abdd4ae-1a96-409b-9c8f-45fdf2d5f7c1',
        mobile: 'https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2Fcarousel1Mini.webp?alt=media&token=35781c85-e94d-4df7-8af2-789fedd02025',
        alt: 'Image 1',
        textKey: 'image1.text',
        text1Key: 'image1.text1',
        buttonTextKey: 'image1.buttonText',
    },
    {
        desktop: 'https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FImage-002-carousel.webp?alt=media&token=36de1d24-a5ae-4a80-9f40-e7df98860de2',
        mobile: 'https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2Fcarosuel2.webp?alt=media&token=3956873b-7795-4c59-80ab-d5d470c8fc31',
        alt: 'Image 2',
        textKey: 'image2.text',
        text1Key: 'image2.text1',
        buttonTextKey: 'image2.buttonText',
    },
    {
        desktop: 'https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FImage-03-carousel.webp?alt=media&token=5f2469fe-19aa-4eec-8c6d-c87135c89953',
        mobile: 'https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2Fcarosuel3.webp?alt=media&token=d90acb84-4392-4287-9ef7-865206dbd323',
        alt: 'Image 3',
        textKey: 'image3.text',
        text1Key: 'image3.text1',
        buttonTextKey: 'image3.buttonText',
    },
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const t = useTranslations('carousel');

    // Cambia de imagen automáticamente cada 5 segundos solo si está visible
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null; // Definimos el tipo de interval

        if (!isHovering) {
            interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 5000);
        }

        return () => {
            if (interval) clearInterval(interval); // Verificamos si interval no es null
        };
    }, [isHovering]);

    // Memoizamos la imagen y el texto para evitar renders innecesarios
    const currentImage = useMemo(() => images[currentIndex], [currentIndex]);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div
            id="controls-carousel"
            className="relative w-full h-screen md:h-[80vh]"
            data-carousel="static"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="relative h-full overflow-hidden rounded-lg">
                <div className="absolute inset-0 transition-transform duration-700 ease-in-out translate-x-0">
                    {/* Primera imagen con prioridad */}
                    <Image
                        src={currentImage.desktop}
                        alt={currentImage.alt}
                        className="object-cover hidden md:block"
                        fill
                        sizes="100vw"  // Cambiado a 100vw para el ancho completo
                        priority={currentIndex === 0}
                        loading={currentIndex === 0 ? 'eager' : 'lazy'}
                    />
                    <Image
                        src={currentImage.mobile}
                        alt={currentImage.alt}
                        className="object-cover md:hidden"
                        fill
                        sizes="100vw"  // Cambiado a 100vw para el ancho completo
                        loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center lg:justify-start lg:pl-24 lg:mr-24 p-4">
                        <div className="text-start lg:w-1/2 lg:pr-8 flex flex-col items-center lg:items-start min-h-[150px]">
                            <p
                                className={`text-white text-2xl text-center lg:text-left leading-tight transition-opacity duration-300 ease-in-out ${
                                    currentImage ? 'opacity-100' : 'opacity-0'
                                }`}
                                aria-label="main text"
                            >
                                {t(currentImage.textKey)}
                            </p>
                            <p className="text-white mt-4 text-sm text-center lg:text-left leading-snug" aria-label="subtext">
                                {t(currentImage.text1Key)}
                            </p>
                            <a href="#formulario" className="btn-presupuesto mt-4" aria-label="button">
                                {t(currentImage.buttonTextKey)}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Botón de anterior */}
            <button
                type="button"
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
                onClick={prevImage}
                aria-label="Previous"
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 focus:outline-none">
                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            {/* Botón de siguiente */}
            <button
                type="button"
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
                onClick={nextImage}
                aria-label="Next"
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 focus:outline-none">
                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
};

export default React.memo(Carousel);