import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="divide-y divide-gray-500 overflow-hidden">
      <Navbar />
      <div
        className="flex divide-x divide-gray-500"
        style={{ height: "calc(100vh - 6rem)" }}
      >
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
}
