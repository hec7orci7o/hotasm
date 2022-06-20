import {useShare} from '../context/ShareContext';
import copy from 'copy-to-clipboard';
import {FiX, FiCopy} from 'react-icons/fi';
import {RiTwitterLine, RiRedditLine, RiFacebookFill, RiLinkedinFill, RiMailLine} from 'react-icons/ri';

const uri = 'https://hotasm.vercel.app/';

export default function Share() {
  const {popUp, handleClose} = useShare();
  return (
    <div className={`h-full absolute top-0 left-0 w-full z-50 flex justify-center ${popUp ? '' : 'hidden'}`}>
      <div className='h-full w-full absolute bg-black opacity-60'/>
      <div className='mt-32 h-fit max-w-lg bg-gray-800 text-white p-6 rounded-lg flex flex-col gap-2 relative'>
        <h2 className='text-xl font-bold opacity-95'>
          Invite your friends
        </h2>
        <p className='text-xs opacity-70 tracking-wider'>
          Explicaion resumida del proyecto Explicaion resumida del proyecto Explicaion resumida del proyecto Explicaion resumida del proyecto Explicaion resumida del proyecto
        </p>
        <div className='mt-2 flex flex-col gap-2'>
          <div className='mt-1.5 flex flex-wrap w-full h-full gap-2'>
            {[{
              id: 1,
              icon: <RiMailLine className='w-7 h-7 '/>,
              text: 'email',
              msg: `https://mail.google.com/mail/u/0/?fs=1&tf=cm&to&su=Save+time+using+HotAsm&body=${uri}&ui=2`,
            }, {
              id: 2,
              icon: <RiTwitterLine className='w-7 h-7 '/>,
              text: 'twitter',
              msg: `http://www.twitter.com/share?url=${uri}`,
            }, {
              id: 3,
              icon: <RiFacebookFill className='w-7 h-7 '/>,
              text: 'facebook',
              msg: `https://www.facebook.com/sharer/sharer.php?u=${uri}`,
            }].map((social) => {
              return (
                <a
                  href={social.link || social.msg}
                  key={social.id}
                  onClick={() =>
                    copy(social.msg, {
                      debug: false,
                      format: 'text/plain',
                    })
                  }
                  className='flex-1 border py-5 rounded-md flex flex-col gap-1.5 items-center justify-center opacity-70 hover:opacity-100'
                >
                  {social.icon}
                  <span className='capitalize text-sm select-none'>{social.text}</span>
                </a>
              );
            })}
          </div>
          <div className='mt-1.5 flex flex-wrap w-full h-full gap-2'>
            {[{
              id: 1,
              icon: <RiRedditLine className='w-7 h-7 '/>,
              text: 'reddit',
              msg: `http://www.reddit.com/submit?url=${uri}&title=Save+time+using+HotAsm`,
            }, {
              id: 2,
              icon: <RiLinkedinFill className='w-7 h-7 '/>,
              text: 'linkedIn',
              msg: `https://www.linkedin.com/sharing/share-offsite/?url=${uri}`,
            }, {
              id: 3,
              icon: <FiCopy className='w-7 h-7 '/>,
              text: 'copiar',
              msg: uri,
            }].map((social) => {
              return (
                <a
                  href={social.msg}
                  key={social.id}
                  onClick={() =>
                    copy(social.msg, {
                      debug: false,
                      format: 'text/plain',
                    })
                  }
                  className='flex-1 border py-5 rounded-md flex flex-col gap-1.5 items-center justify-center opacity-70 hover:opacity-100'
                >
                  {social.icon}
                  <span className='capitalize text-sm select-none'>{social.text}</span>
                </a>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => {
            handleClose();
          }}
          className='absolute top-0 right-0 mt-7 mr-7'
        >
          <FiX className='w-5 h-5'/>
        </button>
      </div>
    </div>
  );
}
