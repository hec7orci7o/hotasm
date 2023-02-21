import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';
import '@/styles/globals.css';

export default function MyApp({
  Component, pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <SessionProvider
        session={session}
        refetchInterval={60 * 5}
        refetchWhenOffline={false}
      >
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
      <Analytics />
    </>
  );
}
