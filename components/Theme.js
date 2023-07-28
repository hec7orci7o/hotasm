import { useState, useEffect } from 'react';

import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function Theme() {
  const [theme, setTheme] = useState();

  useEffect(() => {
    const localTheme = localStorage.getItem('editor-theme');
    if (localTheme !== 'null' && localTheme !== 'undefined') {
      setTheme(localTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('editor-theme', theme);
  }, [theme]);

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <button
      key={ theme }
      onClick={ handleThemeChange }
      className='cursor-pointer text-gray-200 hover:bg-gray-800/30 group flex items-center px-4 py-3 text-sm font-semibold rounded-md w-full'
    >
      { theme === 'dark' ?
        <div className='text-gray-200 group-hover:text-gray-500 flex items-center text-sm'>
          <SunIcon
            className='mr-3 flex-shrink-0 h-5 w-5'
            aria-hidden="true"
          />
          Tema claro
        </div> :
        <div className='text-gray-200 group-hover:text-gray-500 flex items-center text-sm'>
          <MoonIcon
            className='mr-3 flex-shrink-0 h-5 w-5'
            aria-hidden="true"
          />
          Tema escuro
        </div>
      }
    </button>
  );
}
