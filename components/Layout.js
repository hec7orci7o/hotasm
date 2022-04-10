import Navbar from "./Navbar";
import Sidebar from "./SidebarI";
import Footer from "./Footer";
import Documentation from "./Documentation";
import { ScreenProvider } from "../context/ScreenContext";

export default function Layout({ children, docs }) {
  return (
    <>
      <ScreenProvider>
        <div className="h-screen flex flex-col divide-y divide-gray-500 overflow-hidden">
          <Documentation source={docs.source} frontMatter={docs.frontMatter} />
          <Navbar />
          <div 
            className="flex divide-x divide-gray-500 w-full flex-1"
            style={{height: "calc(100vh - 6rem)"}}
          >
            <Sidebar />
            {children}
          </div>
          <Footer />
        </div>
      </ScreenProvider>
    </>
  );
}
