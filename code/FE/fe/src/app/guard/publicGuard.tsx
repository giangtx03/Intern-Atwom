import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicGuard(props: any) {
  const isAuthenticated = useSelector(
    (state: any) => state.user.isAuthenticated
  );

  return !isAuthenticated ? <>{props.children}</> : <Navigate to="/pitch" />;
}
