// React & Third-Party Libraries Imports
import { Outlet, useLocation } from "react-router-dom";

// Components Imports
import Header from "./header/Header";
import Footer from "./footer/Footer";

// Component Styles Imports
import "./Layout.scss";

const Layout = () => {
  const location = useLocation();

  const noLayoutRoutes = ["/login", "/register"];

  if (noLayoutRoutes.includes(location.pathname)) return <Outlet />;

  const PageTitle = location.pathname.split("/")[1].toUpperCase();

  return (
    <div className="layout">
      <Header PageTitle={PageTitle} />
      <div className="children">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
