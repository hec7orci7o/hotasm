import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { getToken } from 'next-auth/jwt';

export default function Home() {
  return (
    <div className='mx-auto max-w-4xl px-4 sm:px-6 md:px-8 h-full flex flex-col justify-start lg:justify-center'>
      <Header />
    </div>
  );
}

Home.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps({req}) {
  const token = await getToken({ req });
  if (!token) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },

    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
