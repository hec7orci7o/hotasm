import { signIn } from 'next-auth/react';

export default function login() {
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-1 bg-gray-800 text-gray-200">
      <div className="w-fit h-fit -mb-6">
        <img src="/vercel.svg" className="w-24 h-24" />
      </div>
      <h1 className="font-medium tracking-wide">Welcome to ChatGPT</h1>
      <p className="tracking-wide">Log in with your OpenAI account to continue</p>
      <div className="flex gap-x-4 py-4">
        <button
          type="button"
          onClick={() => signIn()}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 "
        >
          Log in
        </button>
        <button
          type="button"
          className="opacity-80 cursor-not-allowed inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 "
          disabled
        >
          Sign up
        </button>
      </div>
    </div>
  );
}