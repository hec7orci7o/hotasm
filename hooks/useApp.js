import {useState, useEffect} from 'react';
import toast from 'react-hot-toast';
import {formatParser, assamblyParser} from '@/lib/lexico';
import {formatSintaxReader, programSintaxReader} from '@/lib/sintactico';

export default function useApp(__config, __editor) {
  const [config, setConfig] = useState(__config); // {bits: 8, rules:[strings]}
  const [editor, setEditor] = useState(__editor); // {lines: []}
  const [ISA, setISA] = useState({}); // {op: null, types: [], ranges: []}
  const [output, setOutput] = useState({}); // []


  const updateConfig = (value) => {
    setConfig({
      bits: value.bits || __config.bits,
      rules: value.rules || __config.rules,
    });
  };

  const updateEditor = (value) => {
    setEditor({
      lines: value.lines || __editor.lines,
    });
  };

  useEffect(() => {
    const {error: errFP, tokens} = formatParser(config.rules.join(' '));
    if (errFP) {
      toast.error(errFP);
      return;
    }
    const isa = formatSintaxReader(tokens);
    setISA(isa);
  }, [config]);

  useEffect(() => {
    try {
      const program = editor.lines.join(' ');
      if (program.length > 0) {
        const {error: errAP, tokens} = assamblyParser(program);
        if (errAP) {
          toast.error(errAP);
          return;
        }

        const binaryRaw = programSintaxReader(tokens, ISA, config.bits);
        console.log(binaryRaw);
        setOutput(binaryRaw);
      }
    } catch (error) {
      console.error(error);
    }
  }, [config, editor, ISA]);

  return {
    config,
    editor,
    output,
    updateConfig,
    updateEditor,
  };
}
