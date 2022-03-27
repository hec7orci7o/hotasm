// Constantes para la conversión
const BASE_2 = 2;
const BASE_10 = 10;
const BASE_16 = 16;

// Test para validar campos
const decimal = new RegExp("/(d+)/g");
const binario = new RegExp("^[01]+$");
const hexadecimal = new RegExp("^[0-9a-fA-F]+$");

/**
 * @param {String} _n Cadena que representa un número decimal
 * @returns {String} Cadena binaria
 */
export function dec2bin(_n) {
  try {
    if (decimal.test(_n)) throw Error;
    return parseInt(_n, BASE_10).toString(BASE_2);
  } catch (e) {
    // console.error(e);
  }
}

/**
 * @param {String} _n Cadena que representa un número decimal
 * @returns {String} Cadena hexadecimal
 */
export function dec2hex(_n) {
  try {
    if (decimal.test(_n)) throw Error;
    return parseInt(_n, BASE_10).toString(BASE_16);
  } catch (e) {
    // console.error(e);
  }
}

/**
 * @param {String} _n Cadena que representa un número binario
 * @returns {String} Cadena decimal
 */
export function bin2dec(_n) {
  try {
    if (binario.test(_n)) throw Error;
    return parseInt(_n, BASE_2).toString(BASE_10);
  } catch (e) {
    // console.error(e);
  }
}

/**
 * @param {String} _n Cadena que representa un número binario
 * @returns {String} Cadena hexadecimal
 */
export function bin2hex(_n) {
  try {
    // if (binario.test(_n)) throw Error;
    return parseInt(_n, BASE_2).toString(BASE_16);
  } catch (e) {
    // console.error(e);
  }
}

/**
 * @param {String} _n Cadena que representa un número hexadecimal
 * @returns {String} Cadena decimal
 */
export function hex2dec(_n) {
  try {
    if (hexadecimal.test(_n)) throw Error;
    return parseInt(_n, BASE_16).toString(BASE_10);
  } catch (e) {
    // console.error(e);
  }
}

/**
 * @param {String} _n Cadena que representa un número hexadecimal
 * @returns {String} Cadena binaria
 */
export function hex2bin(_n) {
  try {
    if (hexadecimal.test(_n)) throw Error;
    return parseInt(_n, BASE_16).toString(BASE_2);
  } catch (e) {
    // console.error(e);
  }
}
