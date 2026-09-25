import api from "./api";

/**
 * These call the placeholder Flask endpoints (/api/auth/login, /api/auth/register).
 * The backend currently mocks authentication with in-memory Python lists —
 * there's no real database or session handling yet.
 */

export async function loginUser({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}

export async function registerUser({ name, email, password, role }) {
  const { data } = await api.post("/auth/register", { name, email, password, role });
  return data;
}
