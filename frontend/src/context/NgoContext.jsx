import { createContext, useContext, useState } from "react";
import { useApp } from "./AppContext";

const NgoContext = createContext();

export function NgoProvider({ children }) {
  const {
    donations,
    ngoProfile,
    acceptDonation,
    getDonationById,
    updateNgoProfile,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState("All");

  const availableDonations = donations.filter(
    (d) => d.status === "Pending" || d.status === "Available"
  );
  const acceptedDonations = donations.filter(
    (d) => d.status === "Accepted" || d.status === "Completed"
  );

  const totalAvailableMeals = availableDonations.reduce(
    (sum, d) => sum + (Number(d.estimatedMeals) || 0),
    0
  );
  const totalMealsToDistribute = acceptedDonations.reduce(
    (sum, d) => sum + (Number(d.estimatedMeals) || 0),
    0
  );

  const summaryStats = {
    availableCount: availableDonations.length,
    acceptedCount: acceptedDonations.length,
    availableMeals: totalAvailableMeals,
    mealsToDistribute: totalMealsToDistribute,
    completedDeliveries: 142,
  };

  return (
    <NgoContext.Provider
      value={{
        availableDonations,
        acceptedDonations,
        ngoProfile,
        summaryStats,
        activeFilter,
        setActiveFilter,
        acceptDonation,
        getDonationById,
        updateNgoProfile,
      }}
    >
      {children}
    </NgoContext.Provider>
  );
}

export function useNgo() {
  const context = useContext(NgoContext);
  if (!context) {
    throw new Error("useNgo must be used within an NgoProvider");
  }
  return context;
}
