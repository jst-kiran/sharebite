import { useState } from "react";
import { useApp } from "../../context/AppContext";
import EmptyState from "../../components/donor/EmptyState";

function ManageUsers() {
  const { users, toggleUserStatus } = useApp();
  const [roleFilter, setRoleFilter] = useState("All");

  const ROLES_TABS = [
    { id: "All", label: "All Accounts", count: users.length },
    { id: "donor", label: "Donors", count: users.filter((u) => u.role === "donor").length },
    { id: "ngo", label: "NGOs", count: users.filter((u) => u.role === "ngo").length },
    { id: "admin", label: "Admins", count: users.filter((u) => u.role === "admin").length },
  ];

  const filteredUsers = users.filter((u) => {
    if (roleFilter === "All") return true;
    return u.role === roleFilter;
  });

  // Helper to render distinct visual role badges
  function renderRoleBadge(role) {
    let styles = "bg-emerald-100 text-emerald-800 border-emerald-300";
    let label = "Donor";

    if (role === "ngo") {
      styles = "bg-blue-100 text-blue-800 border-blue-300";
      label = "NGO Partner";
    } else if (role === "admin") {
      styles = "bg-purple-100 text-purple-800 border-purple-300";
      label = "Super Admin";
    }

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${styles}`}>
        <span className="h-1.5 w-1.5 rounded-full fill-current" />
        {label}
      </span>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="eyebrow !text-purple-700">
          User Access Control
        </span>
        <h1 className="font-display text-3xl font-bold text-forest-dark mt-1">
          Platform User Accounts
        </h1>
        <p className="text-sm text-ink/60 mt-1">
          Manage system access, roles, and active/suspended account statuses across all platform users.
        </p>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-ink/10 pb-4">
        {ROLES_TABS.map((tab) => {
          const isActive = roleFilter === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => setRoleFilter(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? "bg-forest text-paper shadow-sm"
                  : "bg-white text-ink/70 border border-ink/10 hover:bg-stone/50 hover:text-forest-dark"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive ? "bg-wheat text-forest-dark font-extrabold" : "bg-stone text-ink/60"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Users Table */}
      {filteredUsers.length > 0 ? (
        <div className="card !bg-white p-0 overflow-hidden border border-ink/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ink">
              <thead className="bg-stone/50 text-forest-dark uppercase font-bold border-b border-ink/10">
                <tr>
                  <th className="py-3.5 px-4">User &amp; Organization</th>
                  <th className="py-3.5 px-4">Email Address</th>
                  <th className="py-3.5 px-4">System Role</th>
                  <th className="py-3.5 px-4">Joined Date</th>
                  <th className="py-3.5 px-4">Account Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-stone/20 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-forest-dark block text-sm">{user.name}</span>
                      <span className="text-[11px] text-ink/40">ID: {user.id}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-ink/80">
                      {user.email}
                    </td>
                    <td className="py-3.5 px-4">
                      {renderRoleBadge(user.role)}
                    </td>
                    <td className="py-3.5 px-4 text-ink/60">
                      {user.joinedDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          user.status === "Active"
                            ? "bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${user.status === "Active" ? "bg-[#16A34A]" : "bg-red-600"}`} />
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {user.role !== "admin" ? (
                        <button
                          type="button"
                          onClick={() => toggleUserStatus(user.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                            user.status === "Active"
                              ? "bg-stone text-ink/70 hover:bg-red-100 hover:text-red-700"
                              : "bg-forest text-paper hover:bg-forest-dark"
                          }`}
                        >
                          {user.status === "Active" ? "Suspend" : "Activate"}
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-ink/40">Protected</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title={`No ${roleFilter} Accounts`}
          description="There are currently no registered users matching this role."
          actionLabel=""
          actionLink=""
        />
      )}
    </div>
  );
}

export default ManageUsers;
