import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import ConfirmationModal from "../donor/ConfirmationModal";
import { useAuth } from "../../context/AuthContext";

function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogoutConfirm() {
    setLogoutModalOpen(false);
    logout();
    window.location.href = "/";
  }

  return (
    <div className="flex min-h-screen bg-paper text-ink font-body">
      {/* Desktop Sidebar (Fixed Left Column) */}
      <div className="hidden lg:block lg:w-64 lg:shrink-0">
        <AdminSidebar
          onLogoutClick={() => setLogoutModalOpen(true)}
          className="fixed top-0 bottom-0 w-64"
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-forest-dark/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 bg-paper z-50 shadow-2xl">
            <AdminSidebar
              onItemClick={() => setMobileOpen(false)}
              onLogoutClick={() => {
                setMobileOpen(false);
                setLogoutModalOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <AdminNavbar onMobileMenuToggle={() => setMobileOpen(true)} />
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={logoutModalOpen}
        title="Log Out of Admin Control Center"
        message="Are you sure you want to log out of your administrative session?"
        confirmLabel="Log Out"
        cancelLabel="Cancel"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setLogoutModalOpen(false)}
      />
    </div>
  );
}

export default AdminLayout;
