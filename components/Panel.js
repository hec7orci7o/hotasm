import {
  ClipboardIcon,
  ArrowUpOnSquareIcon,
  ArrowDownOnSquareIcon,
  PaperAirplaneIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import Tippy from '@tippyjs/react';
import Editor from '@monaco-editor/react';
import copy from 'copy-to-clipboard';
import { useState, useEffect, useRef } from 'react';
import {useRouter} from 'next/router';
import toast from 'react-hot-toast';

export default function Panel({
  title,
  defaultValue,
  setOpen,
  app,
  updateApp,
  defaultLanguage,
}) {
  // ----------------- State -----------------
  const [value, setValue] = useState(defaultValue);

  const updateValue = (__value) => {
    try {
      if (title.toLowerCase().includes('config')) {
        const data = JSON.parse(__value);
        const newValue = { bits: data.bits ?? app.bits, rules: data.rules ?? app.rules };
        setValue(newValue);
        updateApp(newValue);
      } else if (title.toLowerCase().includes('editor')) {
        const newValue = { lines: __value.split('\n').filter((i) => i !== '') ?? app.lines };
        setValue(newValue);
        updateApp(newValue);
      }
    } catch (error) {
      return;
    }
  };

  // ------------- Functionality -------------
  const fileInputRef = useRef();
  const router = useRouter();
  const {id} = router.query;
  const [downloadLink, setDownloadLink] = useState('');

  const makeTextFile = (value, type) => {
    try {
      // This creates the file.
      const data = new Blob([value], {type});
      // this part avoids memory leaks
      if (downloadLink !== '') window.URL.revokeObjectURL(downloadLink);
      // update the download link state
      setDownloadLink(window.URL.createObjectURL(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (title.toLowerCase().includes('config')) makeTextFile(JSON.stringify(app, null, 2), 'application/json');
    else if (title.toLowerCase().includes('editor')) makeTextFile(app?.lines.join('\n'), 'text/plain');
  }, [value]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    try {
      const file = event.target.files[0];

      // Verifica la extensión del archivo
      const validExtensions = ['.json', '.txt'];
      const fileExtension = file?.name.slice(file.name.lastIndexOf('.'));
      if (!validExtensions.includes(fileExtension)) {
        console.error('El archivo debe ser de tipo JSON o TXT');
        return;
      }

      // Lee el contenido del archivo
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (e) => {
        const content = e.target.result;

        // Analiza el contenido como objeto JSON si es un archivo JSON
        if (fileExtension === '.json') {
          const data = JSON.parse(content);
          console.log(data.bits, data.rules);
          console.log({
            bits: data.bits ?? app.bits,
            rules: [...data.rules] ?? app.rules,
          });
          setValue({
            bits: data.bits ?? app.bits,
            rules: [...data.rules] ?? app.rules,
          });
        } else {
          console.log({lines: content.split('\n')});
          // Muestra el contenido como texto plano si es un archivo TXT
          setValue({lines: content.split('\n')});
        }
      };
    } catch (error) {
      console.error(error);
    }
  };

  const actions = [
    {
      icon: Cog6ToothIcon,
      onClick: () => setOpen(true),
      label: 'Output',
    },
    {
      icon: ArrowUpOnSquareIcon,
      onClick: () => handleButtonClick(),
      label: `Upload your ${title === 'Editor' ? 'script' : 'config'}`,
    },
    {
      icon: ArrowDownOnSquareIcon,
      href: downloadLink,
      label: `Download your ${title === 'Editor' ? 'script' : 'config'}`,
    },
    {
      icon: ClipboardIcon,
      onClick: () => {
        let message;
        if (title.toLowerCase().includes('config')) {
          message = JSON.stringify(value, null, 2);
        } else if (title.toLowerCase().includes('editor')) {
          message = value.lines.join('\n');
        }
        copy(message, { debug: false, format: 'text/plain' });
        toast.success('Successfully copied!');
      },
      label: 'Copy to clipboard',
    },
    {
      icon: PaperAirplaneIcon,
      onClick: () => {
        let message;
        if (title.toLowerCase().includes('config')) {
          message = JSON.stringify(value, null, 2);
        } else if (title.toLowerCase().includes('editor')) {
          message = value.lines.join('\n');
        }

        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
      },
      label: 'Share via WhatsApp ',
    },
  ];


  return (
    <div className='w-full flex-1 bg-[#1e1e1e] divide-y divide-white/20 rounded-lg flex flex-col'>
      <div className='w-full px-4 py-2.5 flex justify-between items-center text-gray-200 z-10 relative'>
        <h3 className='text-base font-medium tracking-wide '>
          {title}
        </h3>
        <div className='flex gap-x-2.5'>
          <input
            type="file"
            accept=".json,.txt"
            ref={fileInputRef}
            className='hidden'
            onChange={handleFileChange}
          />
          {actions.map((action, index) => (
            <Tippy
              key={index}
              placement='bottom'
              duration={0}
              arrow={false}
              content={
                <span className="bg-gray-800/20 text-white tracking-tight font-medium text-xs py-1 px-2 rounded-md">
                  {action.label}
                </span>
              }
            >
              {action.href ? (
                <a
                  href={action.href}
                  download={String(title).toLowerCase() === 'editor' ? `${id}.txt` : 'config.json'}
                  className={`p-1.5 border border-white/20 rounded-lg group focus:bg-white/20 focus:border-white`}
                >
                  <action.icon className='w-5 h-5 stroke-1 group-focus:text-white'/>
                </a>
              ):(
                <button
                  onClick={action.onClick}
                  className={`${title !== 'Editor' && action.label === 'Output' && 'hidden'} p-1.5 border border-white/20 rounded-lg group focus:bg-white/20 focus:border-white`}
                >
                  <action.icon className='w-5 h-5 stroke-1 group-focus:text-white'/>
                </button>
              )}
            </Tippy>

          ))}
        </div>
      </div>
      <div className='z-0 flex-auto'>
        <Editor
          height='90%'
          theme="vs-dark"
          defaultLanguage={defaultLanguage}
          value={
            title.toLowerCase().includes('config') ? JSON.stringify(value, null, 2) :
            title.toLowerCase().includes('editor') ? value.lines?.join('\n') :
            value
          }
          onChange={(value) => updateValue(value)}
          className='mt-4 z-0'
        />
      </div>
    </div>
  );
}
