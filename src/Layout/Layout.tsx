import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      <main className="font-inter">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
