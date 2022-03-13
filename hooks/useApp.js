import { useState, useEffect } from "react";
import { parse, parseASM } from "../libs/lexico";
import { sintactico, translate } from "../libs/sintactico";

export default function useApp() {
  /* Módulo que permite cargar y procesar los datos para
   * establecer la configuración del editor de ensamblador
   * en base a las necesidades del usuario.
   * Resumen: Establece una configuracion de traducción
   * para entender el ensamblador del editor.
   */
  const [formats, setFormats] = useState("");
  const [maxBits, setMBits] = useState(32);
  const [ISA, setISA] = useState({}); // Instruction Set Architecture

  useEffect(() => {
    let tokenList = parse(formats);
    setISA(sintactico(tokenList));
  }, [formats, maxBits]);

  /**
   * Carga la configuración para el editor.
   *
   * @param {String} _f // Conjunto de formatos de instrucciones.
   * @param {Number} _n // Número máximo de bits de una instrucción.
   */
  const loadFormat = (_f, _n) => {
    setFormats(_f);
    setMBits(_n);
  };

  /**
   * Descarga / Elimina la configuración actual del editor.
   */
  const unloadFormat = () => {
    setFormats("");
    setMBits(0);
  };

  /* Módulo que se encarga de generar el resultado
   * final de la aplicacion, es decir, la lectura de ccódigo asm
   * introducido y su posterior traducción a ensamblador y a formato
   * de memoria de logisim.
   * Resumen: Traduce el condigo asm introducido por el usuario a
   * binario y a memoria con el formato de logisim.
   */
  const [program, setProgram] = useState("");
  const [binary, setBinary] = useState([]);
  const [memory, setMemory] = useState(<></>);

  useEffect(() => {
    if (program.length > 0) {
      const tokenList = parseASM(program);
      const bins = translate(tokenList, ISA, maxBits);
      setBOut(bins);
    }
  }, [program, ISA, maxBits]);

  const updateProgram = (_c) => setProgram(_c);

  return {
    // modulo configuracion
    formats,
    maxBits,
    ISA,
    loadFormat,
    unloadFormat,
    // modulo editor
    program,
    binary,
    memory,
    updateProgram,
  };
}
