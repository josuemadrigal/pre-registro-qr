// utils/crypto.ts
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'tu_clave_secreta_muy_larga_y_segura'; // Deberías mover esto a variables de entorno

export const encryptData = (data: object): string => {
  try {
    // Convertir el objeto a string
    const jsonString = JSON.stringify(data);
    
    // Cifrar
    const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
    
    // Codificar para URL
    return encodeURIComponent(encrypted);
  } catch (error) {
    console.error('Error al cifrar:', error);
    throw error;
  }
};

export const decryptData = (encryptedData: string): object => {
  try {
    // Decodificar de URL
    const decoded = decodeURIComponent(encryptedData);
    
    // Descifrar
    const decrypted = CryptoJS.AES.decrypt(decoded, SECRET_KEY);
    
    // Convertir a string y luego a objeto
    const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error al descifrar:', error);
    throw error;
  }
};