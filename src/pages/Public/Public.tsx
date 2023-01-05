import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const location = useLocation();

  if (cookies.token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
