import { useState, useEffect } from "react";
import { formatParser, assamblyParser } from "../libs/lexico";
import { formatSintaxReader, programSintaxReader } from "../libs/sintactico";
import { bin2hex } from "../libs/conversores";
import { useSession } from "next-auth/react";

export default function useApp() {
  const { status } = useSession();

  /* Módulo que permite cargar y procesar los datos para
   * establecer la configuración del editor de ensamblador
   * en base a las necesidades del usuario.
   * Resumen: Establece una configuracion de traducción
   * para entender el ensamblador del editor.
   */
  const [formatError, setError] = useState(null)
  const [formats, setFormats] = useState("");
  const [maxBits, setMBits] = useState(0);
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
    if (status === "authenticated" || process.env.NODE_ENV === "development") {
      console.log(_f, _n)
      if (_f !== undefined && _f !== "" && _n !== undefined && _n !== 0) {
        setFormats(_f);
        setMBits(_n);
        setError(null); // sin errores
      } else {
        if ((_f === undefined || _f === "") && (_n === undefined || _n === 0)) {
          setError(1); // error en la configuracion
        } else if (_f === undefined || _f === "") {
          setError(2); // error en los patrones
        } else {
          setError(3); // error en el numero de bits
        }
      }
    }
  };

  /**
   * Descarga / Elimina la configuración actual del editor.
   */
  const unloadFormat = () => {
    setFormats("");
    setMBits(0);
    setError(null); // sin errores
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
  const [memory, setMemory] = useState(["", <></>]);

  useEffect(() => {
    if (program.length > 0) {
      try {
        const { tokens, error } = assamblyParser(program);
        const bins = programSintaxReader(tokens, ISA, maxBits);
        const formatedBinary = formatBinary_V2(bins, "0");
        setBinary([formatedBinary, formatBinary(bins)]);
        if (/[01]/.test(String(bins).replace(",", ""))) {
          setMemory([
            formatMemory_V2(formatedBinary),
            formatMemory(formatedBinary),
          ]);
        } else {
          setMemory(["", <></>]);
        }
      } catch (error) {
        // console.error(error);
      }
    }
  }, [program, ISA, maxBits]);

  const updateProgram = (_c) => setProgram(_c);

  /* Módulo de funciones para formatear la salida
   */

  /**
   * Formatea la lista de instrucciones binarias para
   * representarlas en la zona de output
   *
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
   * Prepara la lista de binarios para ser copia
   * al portapapeles de forma correcta.
   * Forma correcta es aquella que solo contiene 1's y 0's
   *
   * @param {Array} _bin
   * @param {String} _x
   * @returns
   */
  const formatBinary_V2 = (_bin, _x) => {
    const binary = _bin.map((linea) =>
      linea.replaceAll("-", _x).replaceAll("x", _x)
    );
    return binary;
  };

  /**
   * Formatea la lista de instrucciones binarias para
   * representarlas en la zona de output con formato hexadecimal
   *
   * @param {Array} _bin
   */
  const formatMemory = (_bin) => {
    const hex = _bin.map((e) => bin2hex(e));
    return (
      <>
        <>v2.0 raw</>
        <br />
        <>{hex.toString().replaceAll(",", " ")}</>
      </>
    );
  };

  const formatMemory_V2 = (_bin) => {
    let memory = _bin.map((e) => bin2hex(e));
    return "v2.0 raw\n" + String(memory).replaceAll(",", " ");
  };

  return {
    // error
    formatError,
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
