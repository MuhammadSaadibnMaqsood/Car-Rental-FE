import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavDrawer from "../Navbar/NavDrawer";
import Footer from "../Footer/footer";

export default function AppLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const showFooter = location.pathname == "/";

  return (
    <>
      <NavDrawer open={navOpen} setOpen={setNavOpen} />
      <Outlet />
      {!showFooter && <Footer />}
    </>
  );
}
