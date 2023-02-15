import Footer from "./footer";
import Header from "./header";
import { CookiesProvider } from 'react-cookie';

export default function BaseLayout({ children }) {
  return (
    <CookiesProvider>
      {/* HEADER */}
      <Header />

      {/* content */}
      {children}

      {/* Footer */}
      <Footer />
    </CookiesProvider>
  );
}
