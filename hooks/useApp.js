import { useState, useEffect } from "react";
import { formatParser, assamblyParser } from "../libs/lexico";
import { formatSintaxReader, programSintaxReaderv2 } from "../libs/sintactico";
import { bin2hex } from "../libs/conversores";

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
    const { tokens, error } = formatParser(formats);
    const isaAux = formatSintaxReader(tokens);
    setISA(isaAux);
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
  const [binary, setBinary] = useState([[], []]);
  const [memory, setMemory] = useState();

  useEffect(() => {
    if (program.length > 0) {
      try {
        const { tokens, error } = assamblyParser(program);
        const bins = programSintaxReader(tokens, ISA, maxBits);
        setBinary([bins, formatBinary(bins)]);
        setMemory([, formatMemory(bins)]);
      } catch (error) {
        console.error(error);
      }
    }
  }, [program, ISA, maxBits]);

  const updateProgram = (_c) => setProgram(_c);

  /* Módulo de funciones para formatear la salida
   */

  /**
   * @param {Array} _bin
   * @returns
   */
  const formatBinary = (_bin) => {
    let binary = [];
    _bin.forEach((linea) => {
      const regexp = /[-]+|[10x]+/g;
      const array = [...linea.matchAll(regexp)].map((element) => {
        if (element[0].includes("-")) {
          binary.push(
            <span className="text-red-500">
              {element[0].replaceAll("-", "0")}
            </span>
          );
        } else {
          binary.push(<>{element[0].replaceAll("x", "0")}</>);
        }
      });
      binary.push(<br />);
    });
    return binary;
  };

  /**
   *
   * @param {Array} _bin
   */
  const formatMemory = (_bin) => {
    const hex = _bin.map((e) => {
      e = e.replaceAll("-", "0").replaceAll("x", "0");
      e = bin2hex(e);
      return e;
    });
    return (
      <>
        <>v2.0 raw</>
        <br />
        <>{hex.toString().replaceAll(",", " ")}</>
      </>
    );
  };

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
