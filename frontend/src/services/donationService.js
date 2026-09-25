import api from "./api";

export async function getDonorStats() {
  try {
    const res = await api.get("/donor/stats");
    return res.data;
  } catch (err) {
    console.error("Error fetching donor stats:", err);
    throw err;
  }
}

export async function getDonations(statusFilter = "All") {
  try {
    const res = await api.get("/donations", {
      params: { status: statusFilter },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching donations:", err);
    throw err;
  }
}

export async function getDonationById(id) {
  try {
    const res = await api.get(`/donations/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Error fetching donation ${id}:`, err);
    throw err;
  }
}

export async function createDonation(donationData) {
  try {
    const res = await api.post("/donations", donationData);
    return res.data;
  } catch (err) {
    console.error("Error posting new donation:", err);
    throw err;
  }
}

export async function createClaim(donationId, notes = "") {
  try {
    const res = await api.post(`/donations/${donationId}/claims`, { notes });
    return res.data;
  } catch (err) {
    console.error(`Error claiming donation ${donationId}:`, err);
    throw err;
  }
}

export async function updateClaimStatus(claimId, status) {
  try {
    const res = await api.patch(`/claims/${claimId}`, { status });
    return res.data;
  } catch (err) {
    console.error(`Error updating claim ${claimId}:`, err);
    throw err;
  }
}
