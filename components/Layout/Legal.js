import Meta from '../Meta';
import NavbarLegal from '../Navegation/NavbarLegal';

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
