import { FcGoogle } from 'react-icons/fc';
import { GoMarkGithub } from 'react-icons/go';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col justify-around sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-fit h-fit mx-auto py-4">
          <img src="/vercel2-cropped.svg" alt='logo provisional' className="w-24 h-16 mx-auto" />
        </div>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 sm:px-10">
          <div className="space-y-6" action="#" method="POST">
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-700">
              Bienvenido de nuevo
            </h2>

            <div className="flex flex-col gap-y-2 mt-4">
              <button
                type="submit"
                data-provider="google"
                onClick={ () => signIn('google') }
                className="flex w-full justify-start items-center gap-x-3 rounded-sm border py-4 px-5 text-sm font-medium text-gray-800 shadow-sm focus:outline-none"
              >
                <FcGoogle className='w-6 h-6' />
                <span>Continuar con Google</span>
              </button>
              <button
                type="submit"
                data-provider="google"
                onClick={ () => signIn('github') }
                className="flex w-full justify-start items-center gap-x-3 rounded-sm border py-4 px-5 text-sm font-medium text-gray-800 shadow-sm focus:outline-none"
              >
                <GoMarkGithub className='w-6 h-6' />
                <span>Continuar con GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
}
