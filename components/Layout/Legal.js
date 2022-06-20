import Meta from '@/components/Meta';
import NavbarLegal from '@/components/Navegation/NavbarLegal';

export default function Layout({children, docs}) {
  return (
    <>
      <Meta title='legal'/>
      <NavbarLegal />
      <main>
        {children}
      </main>
    </>
  );
}
