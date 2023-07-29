import { SunIcon } from '@heroicons/react/24/outline';
import { useProjects } from '@/context/ProjectsContext';
import { useRouter } from 'next/router';
import * as samples from '@/data/examples';
import { capabilities, limitations } from '@/data/header';

export function Column(props) {
  return (
    <div className='flex flex-col items-center w-full select-none'>
      <props.icon className={ `${props?.usable && 'w-8 h-8'} w-7 h-7 stroke-1` } />
      <h2 className='text-lg mt-1'>{ props.name }</h2>
      <div className='flex flex-col space-y-2 py-4 w-full'>
        { props.items.map((item, index) => {
          return (
            <div
              key={ index }
              onClick={ item.onclick }
              className={ `${props?.usable && 'cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-150'}  w-full p-2.5 bg-gray-50 dark:bg-white/5  rounded-lg text-center` }
            >
              <span className='text-sm font-light tracking-wide'>&quot;{ item.text }&quot;</span>
              <span className='text-sm font-light tracking-wide'>→</span>
            </div>
          );
        }) }
      </div>
    </div>
  );
}

export default function Header() {
  const { createProject } = useProjects();
  const router = useRouter();

  const examples = {
    name: 'Ejemplos',
    icon: SunIcon,
    usable: true,
    items: [
      {
        onclick: () => {
          const project = createProject(samples.exConfig1, samples.exEditor1);
          router.push(`/p/${project.id}`);
        },
        text: samples.exConfig1.name,
      }, {
        onclick: () => {
          const project = createProject(samples.exConfig2, samples.exEditor2);
          router.push(`/p/${project.id}`);
        },
        text: samples.exConfig2.name,
      }, {
        onclick: () => {
          const project = createProject(samples.exConfig3, samples.exEditor3);
          router.push(`/p/${project.id}`);
        },
        text: samples.exConfig3.name,
      },
    ],
  };

  return (
    <div className='h-fit space-y-16 text-gray-800 dark:text-white/80 py-20'>
      <h1 className='text-4xl font-semibold text-center'>HOT ASM</h1>
      <div className='mx-auto flex flex-col lg:flex-row justify-evenly items-start gap-x-4 max-w-lg lg:max-w-4xl px-2 lg:px6 lg:w-full'>
        <Column { ...examples } />
        <Column { ...capabilities } />
        <Column { ...limitations } />
      </div>
    </div>
  );
}
