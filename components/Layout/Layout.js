import Link from 'next/link'
import { useRouter } from 'next/router'
import CookieConsent from 'react-cookie-consent'
import Meta from "../Meta";
import Navbar from "../Navegation/Navbar";
import Sidebar from "../Navegation/SidebarI";
import Footer from "../Navegation/Footer";
import Documentation from "../Documentation";
import { ScreenProvider } from "../../context/ScreenContext";
import { ShareProvider } from '../../context/ShareContext'
import useKey from '../../hooks/useKey'
import Share from '../Share'

export default function Layout({ children, docs }) {
  const router = useRouter()
  const handleContact = () => {
    router.push('mailto:contact@hec7or.me')
  }

  useKey('KeyQ', handleContact)
  return (
    <>
      <ScreenProvider>
        <ShareProvider>
          <Meta/>
          <div className="h-screen flex flex-col divide-y divide-gray-500 overflow-hidden">
            <Documentation source={docs.source} frontMatter={docs.frontMatter} />
            <Navbar />
            <main 
              className="flex divide-x divide-gray-500 w-full flex-1"
              style={{height: "calc(100vh - 6rem)"}}
            >
              <Sidebar />
              {children}
            </main>
            <Footer />
            <Share/>
            <CookieConsent
              buttonText="Accept All"
              declineButtonText="Reject All"
              cookieName="vitop-cookie-consent"
              onAccept={() => {}}
              onDecline={() => {}}
              expires={30}
              extraCookieOptions={{ domain: 'vitop.xyz' }}
              enableDeclineButton
              flipButtons
              overlay
              style={{
                background: '#FFFFFF',
                backgroundOpacity: '50%',
                zIndex: 50,
                color: '#000000'
              }}
              buttonStyle={{
                background: 'rgb(255 255 255)',
                color: 'black',
                fontWeight: '500',
                shadow: '2px',
                filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))'
              }}
              declineButtonStyle={{
                background: 'rgb(239 68 68)',
                color: 'white',
                fontWeight: '500',
                filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))'
              }}
            >
              This website uses cookies to enhance the user experience. To learn more, take a look at our{' '}
              <Link href='/tos'>
                <a className='hover:underline hover:underline-offset-1 text-indigo-700'>
                  terms of service
                </a>
              </Link>
              {' '}and{' '}
              <Link href='/privacypolicy'>
                <a className='hover:underline hover:underline-offset-1 text-indigo-700'>
                  privacy policy
                </a>
              </Link>.
            </CookieConsent>
          </div>
        </ShareProvider>
      </ScreenProvider>
    </>
  );
}
