import {useState, useEffect} from 'react';
import {FiSun, FiMoon} from 'react-icons/fi';

export default function Theme() {
  const [theme, setTheme] = useState();
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    setTheme(localStorage.theme || 'light');
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);


  return (
    <button
      onClick={() => setTheme(colorTheme)}
      className='relative'
    >
      {colorTheme === 'dark' ?
       <FiMoon className='w-4 h-4'/>:
       <FiSun className='w-4 h-4 text-white'/>
      }
      <span className='absolute opacity-0'>theme</span>
    </button>
  );
}
