import Layout from '@/components/Layout';
import Panel from '@/components/Panel';
import SlideOver from '@/components/SlideOver';
import { useProjects } from '@/context/ProjectsContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useApp from '@/hooks/useApp';
import { getToken } from 'next-auth/jwt';

export default function Project() {
  const router = useRouter();
  const { id } = router.query;
  const { getProject } = useProjects();
  const [open, setOpen] = useState(false);

  const defaultConfig = getProject(id)?.config ?? { bits: 32, rules: [] };
  const defaultEditor = getProject(id)?.editor ?? { lines: [] };

  const { config, editor, output, updateConfig, updateEditor } = useApp(defaultConfig, defaultEditor);

  return (
    <div className='mx-auto max-w-4xl px-4 sm:px-6 md:px-8 h-full '>
      <div className='h-full flex flex-col gap-y-4 items-center justify-center'>
        <Panel
          title='Configuración'
          defaultValue={ defaultConfig }
          app={ config }
          updateApp={ updateConfig }
          defaultLanguage='json'
          type='config'
        />
        <Panel
          title='Editor'
          setOpen={ setOpen }
          defaultValue={ defaultEditor }
          app={ editor }
          updateApp={ updateEditor }
          type='editor'
        />
      </div>
      <SlideOver open={ open } setOpen={ setOpen } output={ output } />
    </div>
  );
}

Project.getLayout = (page) => <Layout>{ page }</Layout>;

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
