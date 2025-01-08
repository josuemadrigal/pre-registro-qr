import React, { useState } from 'react';
import { encryptData } from './utils/crypto';

interface RegistroData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
}

const PreRegistroForm = () => {
  const [formData, setFormData] = useState<RegistroData>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
  });
  const [qrUrl, setQrUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Cifrar datos
      const encryptedData = encryptData(formData);

      // Crear URL
      const baseUrl = `${window.location.origin}/qr`;
      const finalUrl = `${baseUrl}?data=${encryptedData}`;
      console.log(finalUrl)

      // Generar QR URL
      const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(finalUrl)}`;
      setQrUrl(qrImageUrl);
      setError(null);
    } catch (err) {
      console.error('Error al generar QR:', err);
      setError('No se pudo generar el código QR. Intenta nuevamente.');
    }
  };

  const downloadQR = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `QR-${formData.nombre.replace(/\s+/g, '-')}.png`;
      link.click();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Error al descargar QR:', err);
      setError('No se pudo descargar el código QR.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 my-40">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Empresa</label>
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors"
        >
          Generar QR Seguro
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {qrUrl && (
        <div className="mt-6">
          <img src={qrUrl} alt="QR Code" className="mx-auto mb-4 " />
          <button
             onClick={() => {
                void downloadQR();
              }}
            className="w-full px-10  py-2 bg-green-600 text-white rounded-md hover:bg-green-700  "
          >
            Descargar QR
          </button>
        </div>
      )}
    </div>
  );
};

export default PreRegistroForm;
