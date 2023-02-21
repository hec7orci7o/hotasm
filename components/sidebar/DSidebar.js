import {
  PlusIcon,
  ChatBubbleLeftIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Theme from '@/components/Theme';
import {useProjects} from '@/context/ProjectsContext';
import { signOut } from 'next-auth/react';
import {useRouter} from 'next/router';

export default function DSidebar() {
  const router = useRouter();
  const {data, createProject, deleteProjects} = useProjects();

  const navigation = [{
    name: 'Clear history',
    icon: TrashIcon,
    onClick: () => {
      deleteProjects();
      router.push('/');
    },
  }, { theme: true }, {
    name: 'Upgrades & FAQ',
    href: 'faq',
    icon: ArrowTopRightOnSquareIcon,
  }, {
    name: 'Log out',
    icon: ArrowRightOnRectangleIcon,
    onClick: () => signOut(),
  }];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-gray-900">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex min-h-0 flex-1 flex-col border-gray-200 divide-y divide-white/20 px-2">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <nav className="flex-1 space-y-1">
            <Link href="/" className="w-full h-fit">
              <img src="/vercel.svg" className="w-24 h-24 mx-auto" />
            </Link>
            <button
              onClick={() => createProject()}
              className='cursor-pointer mb-2 w-full text-gray-200 hover:bg-gray-500/10 transition-colors duration-200 group flex items-center px-3 py-3 text-sm font-medium rounded-md border border-white/20'
            >
              <PlusIcon
                className='text-gray-200 mr-3 flex-shrink-0 h-4 w-4'
                aria-hidden="true"
              />
                  New project
            </button>
            {data.length >= 1 && data.map((item) => (
              <Link
                key={item.id}
                href={`/p/${item.id}`}
                className='cursor-pointer text-gray-200 hover:bg-gray-800/30 group flex items-center px-3 py-3 text-sm font-medium rounded-md'
              >
                <ChatBubbleLeftIcon
                  className='text-gray-200  mr-3 flex-shrink-0 h-5 w-5'
                  aria-hidden="true"
                />
                {item.createdAt}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col flex-shrink-0 border-gray-200 py-4">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <>
                {item.theme ? (
                  <Theme/>
                ) : item.onClick ? (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className='cursor-pointer w-full text-gray-200 hover:bg-gray-800/30 group flex items-center px-3 py-3 text-sm font-medium rounded-md'
                  >
                    <item.icon
                      className='text-gray-200  mr-3 flex-shrink-0 h-5 w-5'
                      aria-hidden="true"
                    />
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className='cursor-pointer text-gray-200 hover:bg-gray-800/30 group flex items-center px-3 py-3 text-sm font-medium rounded-md'
                  >
                    <item.icon
                      className='text-gray-200  mr-3 flex-shrink-0 h-5 w-5'
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                )}
              </>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
