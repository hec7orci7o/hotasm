import {
  FiGithub,
  FiMaximize,
  FiMinimize,
  FiSidebar,
  FiShare2,
  FiHelpCircle,
  FiMessageCircle,
  FiLock,
  FiActivity,
  FiUserPlus,
  FiBook,
} from 'react-icons/fi';
import Link from 'next/link';
import Tippy from '@tippyjs/react';
import copy from 'copy-to-clipboard';
import {useScreen} from '@/context/ScreenContext';
import {useShare} from '@/context/ShareContext';
import toast, {Toaster} from 'react-hot-toast';

export default function Footer() {
  const {
    leftSidebar,
    mzLayout,
    handleDocs,
    handleMode,
    handleSl,
  } = useScreen();
  const {handleOpen} = useShare();

  return (
    <div className="flex justify-between items-center h-8 w-full bg-color-5 text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex gap-4 px-2 relative">
        <Tippy
          arrow={false}
          content={
            <span className="bg-neutral-gray-2 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Collapse sidebar
            </span>
          }
        >
          <button onClick={handleSl} className="opacity-80 hover:opacity-100">
            <FiSidebar
              className={`text-lg cursor-pointer stroke-1 text-white duration-150
               ${leftSidebar ? 'rotate-180' : ''}`}
            />
          </button>
        </Tippy>
        <Tippy
          arrow={false}
          content={
            <span className="bg-neutral-gray-2 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Turn on Zen mode
            </span>
          }
        >
          <button onClick={handleMode} className="opacity-80 hover:opacity-100">
            {mzLayout ? (
              <FiMinimize className="text-lg cursor-pointer stroke-1 text-white" />
            ) : (
              <FiMaximize className="text-lg cursor-pointer stroke-1 text-white" />
            )}
          </button>
        </Tippy>
      </div>
      <div className="flex gap-4 px-2">
        <Tippy
          arrow={false}
          trigger={'click'}
          interactive={true}
          allowHTML={true}
          content={
            <div className='p-4 overflow-hidden w-48 h-56 mb-4 bg-color-5 shadow-sm shadow-color-6 rounded-lg'>
              <div className='flex flex-col items-start text-white divide-y divide-neutral-gray-2 w-full h-full overflow-y-auto'>
                <a
                  href='mailto:contact@hec7or.me'
                  className='w-full py-1.5 px-2 flex gap-3 items-center mb-2 cursor-pointer justify-between opacity-60 hover:opacity-100 hover:bg-neutral-gray-2 hover:bg-opacity-5 rounded-md'
                >
                  <div className='flex gap-2'>
                    <FiMessageCircle className='w-4 h-4'/>
                    <p className='text-xs font-medium'>Talk to us</p>
                  </div>
                  <span className='block text-xs font-medium bg-black bg-opacity-40 py-1 px-2 rounded-lg'>Q</span>
                </a>
                <div className='w-full flex flex-col items-start'>
                  <a href='https://github.com/hec7orci7o/asm-editor' className='w-full mt-2 py-2.5 px-2 flex gap-3 items-center justify-start cursor-pointer opacity-60 hover:opacity-100 hover:bg-neutral-gray-2 hover:bg-opacity-5 rounded-md'>
                    <FiGithub className='w-4 h-4'/>
                    <p className='text-xs font-medium'>GitHub</p>
                  </a>
                  <button
                    onClick={handleOpen}
                    className='w-full py-2.5 px-2 flex gap-3 items-center justify-start  cursor-pointer opacity-60 hover:opacity-100 hover:bg-neutral-gray-2 hover:bg-opacity-5 rounded-md'
                  >
                    <FiUserPlus className='w-4 h-4'/>
                    <p className='text-xs font-medium'>Invite</p>
                  </button>
                  <a href='https://hotasm.betteruptime.com/' className='w-full py-2.5 px-2 flex gap-3 items-center justify-start  cursor-pointer opacity-60 hover:opacity-100 hover:bg-neutral-gray-2 hover:bg-opacity-5 rounded-md'>
                    <FiActivity className='w-4 h-4'/>
                    <p className='text-xs font-medium'>Status</p>
                  </a>
                  <Link href='/tos'>
                    <a className='w-full py-2.5 px-2 flex gap-3 items-center justify-start  cursor-pointer opacity-60 hover:opacity-100 hover:bg-neutral-gray-2 hover:bg-opacity-5 rounded-md'>
                      <FiLock className='w-4 h-4'/>
                      <p className='text-xs font-medium'>Terms and Privacy</p>
                    </a>
                  </Link>
                  <div className='flex gap-3 items-start justify-start mt-2'>
                    <p className='text-xs font-medium opacity-40'>HOTASM v1.0.0</p>
                  </div>
                </div>
              </div>
            </div>

          }
        >
          <button
            className='flex items-center gap-2 font-bold text-xs opacity-90 hover:opacity-100 text-white select-none relative'
          >
            <FiHelpCircle className='w-4 h-4 cursor-pointer stroke-2 text-white select-none'/>
            Help & feedback
          </button>
        </Tippy>
        <Tippy
          arrow={false}
          content={
            <span className="bg-neutral-gray-2 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Documentation
            </span>
          }
        >
          <button
            onClick={handleDocs}
            className="flex items-center opacity-80 hover:opacity-100"
          >
            <FiBook className="text-lg cursor-pointer stroke-1 text-white" />
          </button>
        </Tippy>
        <Tippy
          arrow={false}
          content={
            <span className="bg-neutral-gray-2 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
              Share
            </span>
          }
        >
          <button
            onClick={() => {
              copy('https://hotasm.vercel.app/', {
                debug: false,
                format: 'text/plain',
              });
              toast.success('URL copied to clipboard.');
            }}
            className="opacity-80 hover:opacity-100"
          >
            <FiShare2 className="text-lg cursor-pointer stroke-1 text-white" />
          </button>
        </Tippy>
      </div>
    </div>
  );
}
