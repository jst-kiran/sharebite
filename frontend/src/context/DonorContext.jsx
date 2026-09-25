import { createContext, useContext, useState } from "react";
import { useApp } from "./AppContext";

const DonorContext = createContext();

export function DonorProvider({ children }) {
  const {
    donations,
    donorProfile,
    summaryStats,
    addDonation,
    getDonationById,
    updateDonorProfile,
    deleteDonation,
  } = useApp();

  const [statusFilter, setStatusFilter] = useState("All");

  const donorStats = {
    total: donations.length,
    pending: donations.filter((d) => d.status === "Pending").length,
    accepted: donations.filter((d) => d.status === "Accepted").length,
    completed: donations.filter((d) => d.status === "Completed").length,
  };

  return (
    <DonorContext.Provider
      value={{
        donations,
        profile: donorProfile,
        summaryStats: donorStats,
        statusFilter,
        setStatusFilter,
        addDonation,
        getDonationById,
        updateProfile: updateDonorProfile,
        deleteDonation,
      }}
    >
      {children}
    </DonorContext.Provider>
  );
}

export function useDonor() {
  const context = useContext(DonorContext);
  if (!context) {
    throw new Error("useDonor must be used within a DonorProvider");
  }
  return context;
}
