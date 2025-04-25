import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 flex-grow py-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
