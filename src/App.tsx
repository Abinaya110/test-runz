import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/routesPath";
import LoginScreen from "./modules/LoginModule/LoginScreen";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import MyPageScreen from "./modules/MyPageModule/MyPageScreen";
import PageNotFound from "./utils/PageNotFound";
import SignUpScreen from "./modules/LoginModule/SignUpScreen";
import ForgotPasswordScreen from "./modules/LoginModule/ForgotPasswordScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={routes.LOGIN} element={<LoginScreen />} />
        <Route path={routes.SIGNUP} element={<SignUpScreen />} />
        <Route
          path={routes.FORGOT_PASSWORD}
          element={<ForgotPasswordScreen />}
        />

        <Route element={<ProtectedRoutes />}>
          <Route path={routes.MY_PAGE} element={<MyPageScreen />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
