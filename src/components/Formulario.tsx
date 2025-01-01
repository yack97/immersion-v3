// src/components/Formulario.tsx

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../app/firebaseConfig';
import emailjs from 'emailjs-com';

export default function Formulario() {
    const t = useTranslations('formulario');
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        url: '',
        dni: '',
        nombreEmpresa: '',
        cuilEmpresa: '',
        service: '',
        mensaje: '',
    });
    const [contactType, setContactType] = useState('persona');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateFields = () => {
        if (!formData.nombre || !formData.email || !formData.service) {
            return t('requiredFieldsError');
        }
        if (contactType === 'empresa' && (!formData.nombreEmpresa || !formData.cuilEmpresa)) {
            return t('companyFieldsError');
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            return;
        }

        const finalFormData = {
            ...formData,
            contactType,
            ...(contactType === 'persona' ? { dni: formData.dni } : {
                nombreEmpresa: formData.nombreEmpresa,
                cuilEmpresa: formData.cuilEmpresa,
            }),
        };

        try {
            const docRef = await addDoc(collection(db, "formSubmissions"), finalFormData);
            console.log("Document written with ID: ", docRef.id);
            setSuccess(t('formSentSuccess'));

            await emailjs.send('service_pmcdpsa', 'template_l4blfjn', {
                nombre: String(formData.nombre),
                email: String(formData.email),
                url: String(formData.url),
                dni: String(formData.dni),
                nombreEmpresa: String(formData.nombreEmpresa),
                cuilEmpresa: String(formData.cuilEmpresa),
                service: String(formData.service),
                mensaje: String(formData.mensaje),
                contactType: String(contactType),
            }, '2nr6R1gaSrTHzXlYs');

            console.log('Correo enviado con éxito');

            setFormData({
                nombre: '',
                email: '',
                url: '',
                dni: '',
                nombreEmpresa: '',
                cuilEmpresa: '',
                service: '',
                mensaje: '',
            });
        } catch (err) {
            console.error("Error adding document: ", err);
            setError(t('formSendError'));
        }
    };

    return (
        <div className="mt-12 flex flex-col items-center">
            <div className="relative z-10 max-w-2xl w-full px-6 lg:max-w-7xl lg:px-8 p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-md">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="form-group">
                            <label className="text-white font-semibold">{t('contactType')}</label>
                            <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mt-2">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="contactType"
                                        id="flexRadioPersona"
                                        value="persona"
                                        checked={contactType === 'persona'}
                                        onChange={() => setContactType('persona')}
                                    />
                                    <label className="ml-2 text-white" htmlFor="flexRadioPersona">
                                        {t('persona')}
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="contactType"
                                        id="flexRadioEmpresa"
                                        value="empresa"
                                        checked={contactType === 'empresa'}
                                        onChange={() => setContactType('empresa')}
                                    />
                                    <label className="ml-2 text-white" htmlFor="flexRadioEmpresa">
                                        {t('empresa')}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="form-group">
                                <label htmlFor="nombre" className="text-white font-semibold">{t('name')} <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="nombre"
                                    className="form-input mt-2 w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                    id="nombre"
                                    placeholder={t('namePlaceholder')}
                                    required
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="text-white font-semibold">{t('email')} <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input mt-2 w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                    id="email"
                                    placeholder={t('emailPlaceholder')}
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="form-group">
                                <label htmlFor="url" className="text-white font-semibold">{t('url')} </label>
                                <input
                                    type="text"
                                    name="url"
                                    className="form-input mt-2 w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                    id="url"
                                    placeholder={t('urlPlaceholder')}
                                    value={formData.url}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {contactType === 'persona' && (
                                <div className="form-group">
                                    <label htmlFor="dni" className="text-white font-semibold">{t('dni')} </label>
                                    <input
                                        type="text"
                                        name="dni"
                                        className="form-input mt-2 w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                        id="dni"
                                        placeholder={t('dniPlaceholder')}
                                        value={formData.dni}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}

                            {contactType === 'empresa' && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="nombreEmpresa" className="text-white font-semibold">{t('companyName')} <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            name="nombreEmpresa"
                                            className="form-input mt-2 w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                            id="nombreEmpresa"
                                            placeholder={t('companyNamePlaceholder')}
                                            required
                                            value={formData.nombreEmpresa}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cuilEmpresa" className="text-white font-semibold">{t('companyCuil')}</label>
                                        <input
                                            type="text"
                                            name="cuilEmpresa"
                                            className="form-input mt-2 w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                            id="cuilEmpresa"
                                            placeholder={t('companyCuilPlaceholder')}
                                            value={formData.cuilEmpresa}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="text-white font-semibold">{t('serviceLabel')} <span className="text-red-500">*</span></label>
                            <select
                                name="service"
                                className="form-select mt-2 w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                required
                                value={formData.service}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>{t('servicePlaceholder')}</option>
                                <option value="Desarrollo web">Desarrollo web</option>
                                <option value="Marketing digital">Marketing digital</option>
                                <option value="Diseño UX/UI">Diseño UX/UI</option>
                                <option value="Consultoría">Consultoría</option>


                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="mensaje" className="text-white font-semibold">{t('messageLabel')}</label>
                            <textarea
                                name="mensaje"
                                className="form-input mt-2 w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                id="mensaje"
                                placeholder={t('messagePlaceholder')}
                                value={formData.mensaje}
                                onChange={handleInputChange}
                            />
                        </div>

                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            {t('submitButton')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}