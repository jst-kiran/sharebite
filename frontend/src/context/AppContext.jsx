import { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_DONATIONS,
  INITIAL_DONORS,
  INITIAL_NGOS,
  INITIAL_USERS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_SYSTEM_SETTINGS,
} from "../data/mockAdminData";
import {
  getDonations,
  getDonorStats,
  createDonation as apiCreateDonation,
} from "../services/donationService";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [donors, setDonors] = useState(INITIAL_DONORS);
  const [ngos, setNgos] = useState(INITIAL_NGOS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [activityLogs, setActivityLogs] = useState(INITIAL_ACTIVITY_LOGS);
  const [systemSettings, setSystemSettings] = useState(INITIAL_SYSTEM_SETTINGS);
  const [apiStats, setApiStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Active Donor / NGO Profile state wrappers
  const [donorProfile, setDonorProfile] = useState({
    fullName: "Jane Doe",
    organizationName: "Green Gourmet Catering",
    email: "donor@example.com",
    phoneNumber: "+1 (555) 234-5678",
    address: "42 Eco Avenue, Suite 100, Downtown",
  });

  const [ngoProfile, setNgoProfile] = useState({
    ngoName: "Helping Hands Foundation",
    ngoType: "Shelter & Food Bank Network",
    contactPerson: "Sarah Jenkins",
    email: "ngo@example.com",
    phone: "+1 (555) 987-6543",
    address: "740 Hope Street, Suite 400, Central City",
    serviceArea: "Downtown Metro, East District",
    categoriesAccepted: ["Cooked Meals", "Bakery & Surplus", "Packaged & Shelf Stable", "Fresh Produce"],
    description: "Dedicated non-profit organization serving over 500 daily hot meals to local shelters.",
  });

  // Fetch live API data on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [statsData, donationsData] = await Promise.all([
          getDonorStats(),
          getDonations(),
        ]);

        if (statsData?.success) {
          setApiStats(statsData.stats);
        }

        if (donationsData?.success && donationsData.donations?.length > 0) {
          const mapped = donationsData.donations.map((item) => {
            const rawStatus = (item.status || "available").toLowerCase();
            let uiStatus = "Pending";
            if (rawStatus === "accepted") uiStatus = "Accepted";
            else if (rawStatus === "completed") uiStatus = "Completed";
            else if (rawStatus === "cancelled") uiStatus = "Cancelled";

            return {
              id: item.id,
              foodName: item.food_name || item.foodName,
              category: item.category,
              quantity: `${item.quantity || ""} ${item.quantity_unit || ""}`.trim(),
              estimatedMeals: item.estimated_meals || item.estimatedMeals || 0,
              isVeg: item.is_veg ?? item.isVeg ?? true,
              prepTime: item.prepared_at || item.prepTime || "Fresh",
              storageCondition: item.storage_condition || item.storageCondition || "Room Temperature",
              pickupAddress: item.pickup_address || item.pickupAddress,
              contactPhone: item.contact_phone || item.contactPhone,
              description: item.description,
              image: item.image_url || item.image || null,
              pickupAvailability: item.pickup_start && item.pickup_end ? `${item.pickup_start} - ${item.pickup_end}` : item.pickupAvailability || "Available today",
              status: uiStatus,
              postedDate: item.posted_date || item.postedDate || "Today",
              ngoName: item.ngoName || null,
              acceptedDate: item.accepted_date || item.acceptedDate || null,
              pickupStatus: item.pickup_status || item.pickupStatus || null,
              aiCategory: item.ai_food_category || null,
              aiFoodType: item.ai_food_type || null,
              aiPerishability: item.ai_perishability || null,
              aiStorageRecommendation: item.ai_storage_recommendation || null,
              aiHandlingSuggestion: item.ai_handling_suggestion || null,
              priorityScore: item.ai_priority_score ?? null,
              priorityLevel: item.ai_priority_level || null,
              priorityReason: item.ai_priority_reason || null,
              timeline: item.timeline || [
                { step: 1, label: "Donation Posted", status: "completed", timestamp: "Just now" },
                { step: 2, label: "Awaiting NGO Acceptance", status: "current", timestamp: "Broadcasting to verified NGOs" },
                { step: 3, label: "NGO Accepted", status: "upcoming", timestamp: "Awaiting NGO claim" },
                { step: 4, label: "Ready for Pickup", status: "upcoming", timestamp: "Pending claim" },
                { step: 5, label: "Completed", status: "upcoming", timestamp: "Pending collection" },
              ],
            };
          });
          setDonations(mapped);
        }
      } catch (err) {
        console.warn("Using local state fallback due to API connection state:", err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Calculate dynamic summary stats
  const totalMealsDistributed = donations
    .filter((d) => d.status === "Completed")
    .reduce((sum, d) => sum + (Number(d.estimatedMeals) || 0), 0);

  const totalMealsAvailable = donations
    .filter((d) => d.status === "Pending" || d.status === "Available")
    .reduce((sum, d) => sum + (Number(d.estimatedMeals) || 0), 0);

  const summaryStats = {
    totalDonations: apiStats?.total ?? donations.length,
    pendingDonations: apiStats?.pending ?? donations.filter((d) => d.status === "Pending" || d.status === "Available").length,
    acceptedDonations: apiStats?.accepted ?? donations.filter((d) => d.status === "Accepted").length,
    completedDonations: apiStats?.completed ?? donations.filter((d) => d.status === "Completed").length,
    activeDonorsCount: donors.filter((d) => d.status === "Active").length,
    registeredNgosCount: ngos.length,
    verifiedNgosCount: ngos.filter((n) => n.isVerified).length,
    mealsDistributed: totalMealsDistributed + 1250,
    availableMeals: totalMealsAvailable,
    totalUsersCount: users.length,
  };

  function logActivity(type, title, message, iconColor = "bg-forest/10 text-forest") {
    const newLog = {
      id: `act-${Date.now()}`,
      type,
      title,
      message,
      timestamp: "Just now",
      iconColor,
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  }

  function updateDonationStatus(id, newStatus) {
    setDonations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    logActivity("donation_updated", "Donation Status Override", `Donation ${id} status changed to ${newStatus}`, "bg-amber-100 text-amber-800");
  }

  function verifyNgo(ngoId) {
    setNgos((prev) =>
      prev.map((n) => (n.id === ngoId ? { ...n, isVerified: true } : n))
    );
    const target = ngos.find((n) => n.id === ngoId);
    logActivity("ngo_verified", "NGO Verified", `${target?.ngoName || "NGO"} was successfully verified by System Admin`, "bg-blue-100 text-blue-800");
  }

  function toggleUserStatus(userId) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" }
          : u
      )
    );
    const target = users.find((u) => u.id === userId);
    logActivity("user_toggled", "User Account Status Changed", `Account ${target?.email} status toggled`, "bg-purple-100 text-purple-800");
  }

  function toggleDonorStatus(donorId) {
    setDonors((prev) =>
      prev.map((d) =>
        d.id === donorId
          ? { ...d, status: d.status === "Active" ? "Inactive" : "Active" }
          : d
      )
    );
  }

  async function addDonation(newDonationData) {
    const todayStr = new Date().toISOString().split("T")[0];

    // Preparation time and pickup deadline come from the donor's own
    // datetime-local inputs so the Rescue Priority calculation reflects
    // real timing rather than fixed placeholders.
    const preparedAtDate = newDonationData.prepTime ? new Date(newDonationData.prepTime) : new Date();
    const pickupEndDate = newDonationData.availableUntil
      ? new Date(newDonationData.availableUntil)
      : new Date(Date.now() + 4 * 3600 * 1000);

    // Build payload for backend API
    const apiPayload = {
      food_name: newDonationData.foodName || "Untitled Food Donation",
      category: newDonationData.category || "Cooked Meals",
      quantity: parseFloat(newDonationData.quantity) || 10,
      quantity_unit: newDonationData.quantityUnit || "boxes",
      estimated_meals: Number(newDonationData.estimatedMeals) || 10,
      is_veg: newDonationData.isVeg ?? true,
      prepared_at: preparedAtDate.toISOString(),
      storage_condition: newDonationData.storageCondition || "Room Temperature",
      pickup_address: newDonationData.pickupAddress || donorProfile.address,
      contact_phone: newDonationData.contactPhone || donorProfile.phoneNumber,
      pickup_start: new Date().toISOString(),
      pickup_end: pickupEndDate.toISOString(),
      description: newDonationData.description || "Fresh surplus food ready for collection.",
      posted_date: todayStr,
    };

    let createdId = `don-${String(donations.length + 1).padStart(2, "0")}`;
    let createdDonation = null;

    try {
      const res = await apiCreateDonation(apiPayload);
      if (res?.success && res.donation) {
        createdId = res.donation.id;
        createdDonation = res.donation;
      }
    } catch (e) {
      console.warn("API add donation fallback to local state:", e);
    }

    const formatted = {
      id: createdId,
      foodName: apiPayload.food_name,
      category: apiPayload.category,
      quantity: `${apiPayload.quantity} ${apiPayload.quantity_unit}`,
      estimatedMeals: apiPayload.estimated_meals,
      isVeg: apiPayload.is_veg,
      prepTime: "Just Prepared",
      storageCondition: apiPayload.storage_condition,
      donorName: donorProfile.organizationName || donorProfile.fullName,
      donorEmail: donorProfile.email,
      pickupAddress: apiPayload.pickup_address,
      contactPhone: apiPayload.contact_phone,
      description: apiPayload.description,
      image: newDonationData.imagePreview || null,
      pickupAvailability: "Available for immediate pickup",
      status: "Pending",
      postedDate: todayStr,
      ngoName: null,
      acceptedDate: null,
      pickupStatus: null,
      aiCategory: createdDonation?.ai_food_category || null,
      aiFoodType: createdDonation?.ai_food_type || null,
      aiPerishability: createdDonation?.ai_perishability || null,
      aiStorageRecommendation: createdDonation?.ai_storage_recommendation || null,
      aiHandlingSuggestion: createdDonation?.ai_handling_suggestion || null,
      priorityScore: createdDonation?.ai_priority_score ?? null,
      priorityLevel: createdDonation?.ai_priority_level || null,
      priorityReason: createdDonation?.ai_priority_reason || null,
      timeline: [
        { step: 1, label: "Donation Posted", status: "completed", timestamp: "Just now" },
        { step: 2, label: "Awaiting NGO Acceptance", status: "current", timestamp: "Broadcasting to verified NGOs" },
        { step: 3, label: "NGO Accepted", status: "upcoming", timestamp: "Awaiting NGO claim" },
        { step: 4, label: "Ready for Pickup", status: "upcoming", timestamp: "Pending claim" },
        { step: 5, label: "Completed", status: "upcoming", timestamp: "Pending collection" },
      ],
    };

    setDonations((prev) => [formatted, ...prev]);
    logActivity("donation_posted", "Donation Posted", `${formatted.donorName} posted ${formatted.foodName}`);
    
    // Refresh stats from backend
    getDonorStats().then((data) => {
      if (data?.success) setApiStats(data.stats);
    }).catch(() => {});

    return formatted;
  }

  function acceptDonation(donationId) {
    const nowStr = new Date().toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    setDonations((prev) =>
      prev.map((item) =>
        item.id === donationId
          ? {
              ...item,
              status: "Accepted",
              ngoName: ngoProfile.ngoName,
              acceptedDate: nowStr,
              pickupStatus: "Awaiting Pickup",
              timeline: [
                { step: 1, label: "Donation Posted", status: "completed", timestamp: item.postedDate },
                { step: 2, label: "Awaiting NGO Acceptance", status: "completed", timestamp: "Today" },
                { step: 3, label: "NGO Accepted", status: "completed", timestamp: `Accepted by ${ngoProfile.ngoName} (${nowStr})` },
                { step: 4, label: "Ready for Pickup", status: "current", timestamp: "Awaiting volunteer dispatch" },
                { step: 5, label: "Completed", status: "upcoming", timestamp: "Pending collection" },
              ],
            }
          : item
      )
    );

    const target = donations.find((d) => d.id === donationId);
    logActivity("donation_accepted", "Donation Claimed", `${ngoProfile.ngoName} claimed ${target?.foodName || "donation"}`, "bg-amber-100 text-amber-800");
    return true;
  }

  function getDonationById(id) {
    return donations.find((d) => d.id === id);
  }

  function updateDonorProfile(updated) {
    setDonorProfile((prev) => ({ ...prev, ...updated }));
  }

  function updateNgoProfile(updated) {
    setNgoProfile((prev) => ({ ...prev, ...updated }));
  }

  function updateSystemSettings(updated) {
    setSystemSettings((prev) => ({ ...prev, ...updated }));
    logActivity("settings_updated", "System Settings Updated", "Platform configuration settings were modified", "bg-purple-100 text-purple-800");
  }

  function deleteDonation(id) {
    setDonations((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <AppContext.Provider
      value={{
        donations,
        donors,
        ngos,
        users,
        activityLogs,
        systemSettings,
        summaryStats,
        donorProfile,
        ngoProfile,
        loading,
        addDonation,
        acceptDonation,
        updateDonationStatus,
        verifyNgo,
        toggleUserStatus,
        toggleDonorStatus,
        getDonationById,
        updateDonorProfile,
        updateNgoProfile,
        updateSystemSettings,
        deleteDonation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
