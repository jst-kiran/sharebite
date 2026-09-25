import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Donor Module Imports
import { DonorProvider } from "./context/DonorContext";
import DonorLayout from "./components/donor/DonorLayout";
import Dashboard from "./pages/donor/Dashboard";
import AddDonation from "./pages/donor/AddDonation";
import MyDonations from "./pages/donor/MyDonations";
import DonationDetails from "./pages/donor/DonationDetails";
import Profile from "./pages/donor/Profile";

// NGO Module Imports
import { NgoProvider } from "./context/NgoContext";
import NgoLayout from "./components/ngo/NgoLayout";
import NgoDashboard from "./pages/ngo/NgoDashboard";
import AvailableDonations from "./pages/ngo/AvailableDonations";
import AcceptedDonations from "./pages/ngo/AcceptedDonations";
import NgoDonationDetails from "./pages/ngo/NgoDonationDetails";
import NgoProfile from "./pages/ngo/NgoProfile";

// Admin Module Imports
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageDonations from "./pages/admin/ManageDonations";
import ManageDonors from "./pages/admin/ManageDonors";
import ManageNgos from "./pages/admin/ManageNgos";
import ManageUsers from "./pages/admin/ManageUsers";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Public Unprotected Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Protected Donor Module Routes (Strict RBAC: Donor Only) */}
        <Route element={<ProtectedRoute allowedRoles={["donor"]} />}>
          <Route
            path="/donor/*"
            element={
              <DonorProvider>
                <DonorLayout />
              </DonorProvider>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-donation" element={<AddDonation />} />
            <Route path="my-donations" element={<MyDonations />} />
            <Route path="donation/:id" element={<DonationDetails />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Protected NGO Module Routes (Strict RBAC: NGO Only) */}
        <Route element={<ProtectedRoute allowedRoles={["ngo"]} />}>
          <Route
            path="/ngo/*"
            element={
              <NgoProvider>
                <NgoLayout />
              </NgoProvider>
            }
          >
            <Route path="dashboard" element={<NgoDashboard />} />
            <Route path="available-donations" element={<AvailableDonations />} />
            <Route path="accepted-donations" element={<AcceptedDonations />} />
            <Route path="donation/:id" element={<NgoDonationDetails />} />
            <Route path="profile" element={<NgoProfile />} />
          </Route>
        </Route>

        {/* Protected Admin Module Routes (Strict RBAC: Admin Only) */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="donations" element={<ManageDonations />} />
            <Route path="donors" element={<ManageDonors />} />
            <Route path="ngos" element={<ManageNgos />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
