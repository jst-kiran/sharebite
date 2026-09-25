import { useApp } from "../../context/AppContext";

function ManageDonors() {
  const { donors, toggleDonorStatus } = useApp();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="eyebrow !text-purple-700">
          Donor Management
        </span>
        <h1 className="font-display text-3xl font-bold text-forest-dark mt-1">
          Registered Food Donors
        </h1>
        <p className="text-sm text-ink/60 mt-1">
          Directory of individual donors, catering businesses, restaurants, and bakeries.
        </p>
      </div>

      {/* Donors Table */}
      <div className="card !bg-white p-0 overflow-hidden border border-ink/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink">
            <thead className="bg-stone/50 text-forest-dark uppercase font-bold border-b border-ink/10">
              <tr>
                <th className="py-3.5 px-4">Donor Name &amp; Org</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Primary Address</th>
                <th className="py-3.5 px-4 text-center">Donations Posted</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {donors.map((donor) => (
                <tr key={donor.id} className="hover:bg-stone/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-forest-dark block text-sm">{donor.organizationName}</span>
                    <span className="text-[11px] text-ink/60">Contact: {donor.fullName}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-ink/80 block">{donor.email}</span>
                    <span className="text-[11px] text-ink/50">{donor.phone}</span>
                  </td>
                  <td className="py-3.5 px-4 text-ink/70 max-w-xs truncate">
                    {donor.address}
                  </td>
                  <td className="py-3.5 px-4 text-center font-extrabold text-forest text-sm">
                    {donor.totalDonations}
                  </td>
                  <td className="py-3.5 px-4 text-ink/60">
                    {donor.joinedDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        donor.status === "Active"
                          ? "bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${donor.status === "Active" ? "bg-[#16A34A]" : "bg-red-600"}`} />
                      {donor.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => toggleDonorStatus(donor.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                        donor.status === "Active"
                          ? "bg-stone text-ink/70 hover:bg-red-100 hover:text-red-700"
                          : "bg-forest text-paper hover:bg-forest-dark"
                      }`}
                    >
                      {donor.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageDonors;
