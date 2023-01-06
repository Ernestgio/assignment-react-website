import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const removeCookie = useCookies(["token"])[2];
  removeCookie("token");
  return <Navigate to="/login" />;
}
