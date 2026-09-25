import { useState } from "react";
import { useApp } from "../../context/AppContext";
import ConfirmationModal from "../../components/donor/ConfirmationModal";

function ManageNgos() {
  const { ngos, verifyNgo } = useApp();
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  function handleVerifyClick(ngo) {
    setSelectedNgo(ngo);
    setConfirmModalOpen(true);
  }

  function handleConfirmVerify() {
    if (selectedNgo) {
      verifyNgo(selectedNgo.id);
    }
    setConfirmModalOpen(false);
    setSelectedNgo(null);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="eyebrow !text-purple-700">
          NGO Verification
        </span>
        <h1 className="font-display text-3xl font-bold text-forest-dark mt-1">
          Partner NGO Directory
        </h1>
        <p className="text-sm text-ink/60 mt-1">
          Review credentials, service areas, and verify partner non-profit organizations.
        </p>
      </div>

      {/* NGOs Table */}
      <div className="card !bg-white p-0 overflow-hidden border border-ink/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink">
            <thead className="bg-stone/50 text-forest-dark uppercase font-bold border-b border-ink/10">
              <tr>
                <th className="py-3.5 px-4">NGO Organization</th>
                <th className="py-3.5 px-4">NGO Type</th>
                <th className="py-3.5 px-4">Contact Person</th>
                <th className="py-3.5 px-4">Service Area</th>
                <th className="py-3.5 px-4 text-center">Meals Claimed</th>
                <th className="py-3.5 px-4">Verification</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {ngos.map((ngo) => (
                <tr key={ngo.id} className="hover:bg-stone/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-forest-dark block text-sm">{ngo.ngoName}</span>
                    <span className="text-[11px] text-ink/50">Joined: {ngo.joinedDate}</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-ink/80">
                    {ngo.ngoType}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-forest-dark block">{ngo.contactPerson}</span>
                    <span className="text-[11px] text-ink/50">{ngo.email}</span>
                  </td>
                  <td className="py-3.5 px-4 text-ink/70 max-w-xs truncate">
                    {ngo.serviceArea}
                  </td>
                  <td className="py-3.5 px-4 text-center font-extrabold text-forest text-sm">
                    {ngo.mealsClaimed}
                  </td>
                  <td className="py-3.5 px-4">
                    {ngo.isVerified ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                        Verified NGO
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
                        Pending Review
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {!ngo.isVerified ? (
                      <button
                        type="button"
                        onClick={() => handleVerifyClick(ngo)}
                        className="btn-primary !px-3 !py-1 text-xs font-bold"
                      >
                        Verify NGO
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-fern">Verified ✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NGO Verification Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModalOpen}
        title="Confirm NGO Verification"
        message={`Are you sure you want to verify "${selectedNgo?.ngoName}" as an official partner non-profit organization?`}
        confirmLabel="Verify NGO"
        cancelLabel="Cancel"
        onConfirm={handleConfirmVerify}
        onCancel={() => setConfirmModalOpen(false)}
      />
    </div>
  );
}

export default ManageNgos;
