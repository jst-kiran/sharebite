import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("sb_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = Boolean(currentUser);

  function login(email, role = "donor", name = "") {
    let effectiveRole = (role || "").toLowerCase();
    const cleanEmail = (email || "").toLowerCase().trim();

    if (cleanEmail === "ngo@example.com" || cleanEmail.includes("ngo")) {
      effectiveRole = "ngo";
    } else if (cleanEmail === "admin@example.com" || cleanEmail.includes("admin")) {
      effectiveRole = "admin";
    } else if (cleanEmail === "donor@example.com" || cleanEmail.includes("donor")) {
      effectiveRole = "donor";
    }

    let defaultName = name;
    if (!defaultName) {
      if (effectiveRole === "admin") defaultName = "Super Admin";
      else if (effectiveRole === "ngo") defaultName = "Helping Hands Foundation";
      else defaultName = "Green Gourmet Catering";
    }

    const user = {
      name: defaultName,
      email: cleanEmail || `${effectiveRole}@example.com`,
      role: effectiveRole,
    };

    const tokenMap = {
      ngo: "demo-ngo-token",
      admin: "demo-admin-token",
      donor: "demo-donor-token",
    };
    const token = tokenMap[effectiveRole] || "demo-donor-token";

    localStorage.setItem("sb_auth_token", token);
    localStorage.setItem("sb_user", JSON.stringify(user));
    setCurrentUser(user);
    return user;
  }

  function logout() {
    localStorage.removeItem("sb_auth_token");
    localStorage.removeItem("sb_user");
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
