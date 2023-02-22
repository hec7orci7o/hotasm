import { FcGoogle } from 'react-icons/fc';
import { GoMarkGithub } from 'react-icons/go';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col justify-around sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-fit h-fit mx-auto py-4">
          <img src="/vercel2-cropped.svg" className="w-24 h-16 mx-auto" />
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-700">
                Welcome back
            </h2>
            <div>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  required
                  disabled={true}
                  className="block w-full appearance-none rounded-sm border border-gray-300 px-3 py-4 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={true}
                className="cursor-not-allowed capitalize flex w-full justify-center rounded-sm border border-transparent bg-emerald/80 hover:bg-emerald/90 duration-300 py-4 px-4 text-sm font-medium text-white shadow-sm focus:outline-none"
              >
                  continue
              </button>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm font-base tracking-wide">
                Don&apos;t have an account?
                <a href="#" className="ml-1 text-emerald cursor-not-allowed" disabled={true}>
                 Sign up
                </a>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">OR</span>
              </div>
            </div>

            <div className="flex flex-col gap-y-2 mt-4">
              <button
                type="submit"
                data-provider="google"
                onClick={() => signIn('google')}
                className="flex w-full justify-start items-center gap-x-3 rounded-sm border py-4 px-5 text-sm font-medium text-gray-800 shadow-sm focus:outline-none"
              >
                <FcGoogle className='w-6 h-6'/>
                <span>Continue with Google</span>
              </button>
              <button
                type="submit"
                data-provider="google"
                onClick={() =>signIn('github')}
                className="flex w-full justify-start items-center gap-x-3 rounded-sm border py-4 px-5 text-sm font-medium text-gray-800 shadow-sm focus:outline-none"
              >
                <GoMarkGithub className='w-6 h-6'/>
                <span>Continue with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div/>
    </div>
  );
}
