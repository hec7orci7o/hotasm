import {
  PlusIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useProjects } from '@/context/ProjectsContext';
import { useRouter } from 'next/router';
import Dropdown from '@/components/Dropdown';

export default function DSidebar() {
  const router = useRouter();
  const { id } = router.query;
  const { data, createProject } = useProjects();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-gray-900">
      {/* Sidebar component, swap this element with another sidebar if you like */ }
      <div className="flex min-h-0 flex-1 flex-col border-gray-200 divide-y divide-white/20 px-2">
        <div className="flex flex-1 flex-col overflow-y-auto py-2.5">
          <nav className="flex-1 space-y-1">
            <button
              onClick={ () => createProject() }
              className='cursor-pointer mb-2 w-full text-gray-200 hover:bg-gray-500/10 transition-colors duration-200 group flex items-center px-3 py-3 text-sm font-medium rounded-md border border-white/20'
            >
              <PlusIcon
                className='text-gray-200 mr-3 flex-shrink-0 h-4 w-4'
                aria-hidden="true"
              />
              Nueva nota
            </button>
            { data.length >= 1 && data.map((item) => (
              <Link
                key={ item.id }
                href={ `/p/${item.id}` }
                className='cursor-pointer text-gray-200 hover:bg-gray-800/30 group flex items-center px-3 py-3 text-sm font-medium rounded-md'
              >
                <ChatBubbleLeftIcon
                  className={ `text-gray-200 mr-3 flex-shrink-0 h-5 w-5 ${item.id === id && 'fill-white/20'}` }
                  aria-hidden="true"
                />
                <span className='whitespace-nowrap truncate'>
                  { item.config?.name ?? item.createdAt }
                </span>
              </Link>
            )) }
          </nav>
        </div>
        <div className="flex flex-col flex-shrink-0 border-gray-200 py-2.5">
          <Dropdown
            isLoading={ true }
            avatar={ '' }
            username={ '' }
          />
        </div>
      </div>
    </div>
  );
}
