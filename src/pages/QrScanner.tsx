import React, { useEffect, useState } from 'react';
import { decryptData } from './utils/crypto';

interface RegistroData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
}

const QrScanner: React.FC = () => {
  const [formData, setFormData] = useState<RegistroData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDecryptedData =  () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const encryptedData = params.get('data');

        if (!encryptedData) {
          throw new Error('No se encontraron datos cifrados');
        }

        // Descifrar los datos
        const decryptedData = decryptData(encryptedData) as RegistroData;
        setFormData(decryptedData);
        setError(null); // Limpiar cualquier error previo
      } catch (err) {
        console.error('Error al procesar datos cifrados:', err);
        setError('No se pudo procesar el código QR. Verifique los datos o intente nuevamente.');
      }
    };

    fetchDecryptedData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) {
      alert('No hay datos válidos para confirmar.');
      return;
    }
    console.log('Registro confirmado:', formData);
    alert('Registro completado con éxito');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 my-40">
      <h2 className="text-xl font-bold mb-4">Confirmar Registro</h2>

      {error ? (
        <p className="text-red-600 mb-4" aria-live="polite">
          {error}
        </p>
      ) : formData ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <ReadOnlyField label="Nombre" value={formData.nombre} />
          <ReadOnlyField label="Email" value={formData.email} />
          <ReadOnlyField label="Teléfono" value={formData.telefono} />
          <ReadOnlyField label="Empresa" value={formData.empresa} />
          <button
            type="submit"
            className="w-full bg-green-600 text-white rounded-md py-2 hover:bg-green-700 transition-colors"
          >
            Confirmar Registro
          </button>
        </form>
      ) : (
        <p className="text-gray-600">Cargando datos...</p>
      )}
    </div>
  );
};

interface ReadOnlyFieldProps {
  label: string;
  value: string;
}

const ReadOnlyField: React.FC<ReadOnlyFieldProps> = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      value={value}
      readOnly
      className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm p-2 border"
    />
  </div>
);

export default QrScanner;
