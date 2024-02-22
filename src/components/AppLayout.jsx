import { Outlet } from "react-router-dom";

function AppLayout({ children }) {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AppLayout;
