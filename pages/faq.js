import Layout from '@/components/Layout';
import { getToken } from 'next-auth/jwt';
import { faqs } from '@/data/faqs';

export default function FAQ() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900 dark:text-white">Preguntas más frecuentes</h2>
      <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-200">
        ¿Tiene otra pregunta y no encuentra la respuesta que busca? Ponte en contacto con el equipo{ ' ' }
        <a href="mailto:hectortoraltrabajos@gmail.com?Subject=FAQ_HOTASM" target="_top" className="font-semibold text-emerald hover:emerald">
          enviando un email
        </a>{ ' ' }
        y nos pondremos en contacto contigo lo antes posible.
      </p>
      <div className="mt-20">
        <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
          { faqs.map((faq) => (
            <div key={ faq.id }>
              <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">{ faq.question }</dt>
              <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-200">{ faq.answer }</dd>
            </div>
          )) }
        </dl>
      </div>
    </div>
  );
}

FAQ.getLayout = (page) => <Layout>{ page }</Layout>;

export async function getServerSideProps({ req }) {
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
