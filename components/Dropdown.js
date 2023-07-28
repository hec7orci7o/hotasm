import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import {
  EllipsisHorizontalIcon,
  ArrowRightOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Theme from '@/components/Theme';
import { useProjects } from '@/context/ProjectsContext';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown({ isLoading, username, avatar }) {
  const { deleteProjects } = useProjects();
  const router = useRouter();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full gap-x-1.5 rounded-md text-sm font-semibold shadow-sm cursor-pointer text-gray-200 hover:bg-gray-800/30 group items-center justify-between p-3">
          <span className='flex items-center gap-x-2 capitalize'>
            <img
              className="h-7 w-7 object-cover rounded-full select-none"
              src={ isLoading ? `/animals/1.webp` : `/${avatar}` }
              alt={ avatar }
            />
            { username || 'User' }
          </span>
          <EllipsisHorizontalIcon className='h-5 w-5' />
        </Menu.Button>
      </div>

      <Transition
        as={ Fragment }
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="mb-14 w-full absolute right-0 bottom-0 z-10 origin-top-right divide-y divide-gray-100/20 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2 space-y-2">
            <Menu.Item>
              { ({ active }) => (
                <div
                  className={ classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-200',
                    'group flex items-center text-sm w-full',
                  ) }
                >
                  <Theme active={ active } />
                </div>
              ) }
            </Menu.Item>
            <Menu.Item>
              { ({ active }) => (
                <Link
                  href="/faq"
                  className={ classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-200',
                    'group flex items-center px-4 py-3 text-sm w-full',
                  ) }
                >
                  <ArrowTopRightOnSquareIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Ayuda & FAQ
                </Link>
              ) }
            </Menu.Item>
            <Menu.Item>
              { ({ active }) => (
                <button
                  onClick={ () => {
                    deleteProjects();
                    router.push('/');
                  } }
                  className={ classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-200',
                    'group flex items-center px-4 py-3 text-sm w-full',
                  ) }
                >
                  <TrashIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Borrar historial
                </button>
              ) }
            </Menu.Item>
          </div>
          <div className="py-2 space-y-2">
            <Menu.Item>
              { ({ active }) => (
                <button
                  onClick={ () => signOut() }
                  className={ classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-200',
                    'group flex items-center px-4 py-3 text-sm w-full',
                  ) }
                >
                  <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Cerrar Sesión
                </button>
              ) }
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
