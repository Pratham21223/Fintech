import { useAuth } from "../context/AuthContext";

export default function RoleGate({ roles, children }) {
  const { user } = useAuth();

  if (roles.includes(user?.role)) {
    return children;
  }

  return null;
}
