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
      <Analytics
        beforeSend={(event) => {
          const url = new URL(event.url);
          const pathname = url.pathname.split('/').slice(0, 2).join('/');
          url.pathname = pathname;
          return {
            ...event,
            url: url.toString(),
          };
        }}/>
    </>
  );
}
