import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />

      <div className="container-fluid">
        <div className="row flex-nowrap">
          <AdminSidebar />

          <div className="col py-3">
            {/* Сюди підставляється компонет один із групи комеонетів, які відносяться до даного Layout */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
