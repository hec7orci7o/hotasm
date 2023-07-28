import { bin2hex } from '@/lib/conversores';

/**
 * Limpia la lista de instrucciones binarias para
 * que todas las instrucciones tengan el mismo formato de 0's y 1's
 *
 * @param {Array} rawBinary - Lista de instrucciones binarias
 * @param {String} c - Caracter que representa el valor de x
 * @returns {Array} Lista de instrucciones binarias
 */
export const cleanBinaryData = (rawBinary, c = '0') => {
  try {
    return rawBinary.map((linea) => linea.replaceAll('-', c).replaceAll('x', c));
  } catch (exception) {
    return ['0'];
  }
};

/**
 * Convierte una lista de instrucciones binarias a hexadecimal
 * @param {Array} rawBinary - Lista de instrucciones binarias
 * @returns {String} Formato de fichero para memoria de logisim
 */
export const toLogisim = (rawBinary) => {
  const binary = cleanBinaryData(rawBinary);
  const memory = binary.map((e) => bin2hex(e));
  return 'v2.0 raw\n' + String(memory).replaceAll(',', ' ');
};

/**
 * Une una lista de instrucciones binarias en un solo string
 * @param {Array} rawBinary - Lista de instrucciones binarias
 * @returns {String} Formato de fichero para fichero de texto
 */
export const toPainText = (rawBinary) => {
  const binary = cleanBinaryData(rawBinary);
  return binary.join('\n');
};
