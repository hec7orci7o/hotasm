import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="sticky top-0 h-16 w-full flex items-center tracking-wide z-40 bg-gray-900 bg-opacity-80">
      <div className="flex justify-center items-center container mx-auto relative">
        <div className='hidden sm:flex gap-8'>
          <Link href='/'>
            <a className='capitalize text-sm font-bold tracking-normal py-2.5 rounded-lg text-white duration-300 hover:underline hover:underline-offset-2'>
              Editor
            </a>
          </Link>
          <Link href='/tos'>
            <a className='capitalize text-sm font-bold tracking-normal py-2.5 rounded-lg text-white duration-300 hover:underline hover:underline-offset-2'>
              ToS
            </a>
          </Link>
          <Link href='/privacypolicy'>
            <a className='capitalize text-sm font-bold tracking-normal py-2.5 rounded-lg text-white duration-300 hover:underline hover:underline-offset-2'>
              privacyPolicy
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
