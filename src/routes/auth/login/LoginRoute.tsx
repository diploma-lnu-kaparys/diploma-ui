import { useSearchParams } from "react-router-dom";
import LoginScreen from "../../../pages/LoginScreen";

const LoginRoute = () => {
  const [searchParams] = useSearchParams();

  const returnUrl = searchParams.get("returnUrl");

  return <LoginScreen returnUrl={returnUrl} />;
};

export default LoginRoute;
