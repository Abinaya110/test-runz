import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AssetsScreen from "./modules/AssetsModule/AssetsScreen";
import BillingScreen from "./modules/BillingModule/BillingScreen";
import ForgotPasswordScreen from "./modules/LoginModule/ForgotPasswordScreen";
import LoginScreen from "./modules/LoginModule/LoginScreen";
import SignUpScreen from "./modules/LoginModule/SignUpScreen";
import MyPageScreen from "./modules/MyPageModule/MyPageScreen";
import ProceduresEditScreen from "./modules/ProceduresModule/ProceduresEditScreen";
import ProceduresScreen from "./modules/ProceduresModule/ProceduresScreen";
import ProjectsScreen from "./modules/ProjectsModule/ProjectsScreen";
import RunzEditScreen from "./modules/RunzModule/RunzEditScreen";
import RunzScreen from "./modules/RunzModule/RunzScreen";
import SettingsScreen from "./modules/SettingsModule/SettingsScreen";
import { routes } from "./routes/routesPath";
import PageNotFound from "./utils/PageNotFound";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Layout from "./common/Layout/Layout";
import { useInterceptors } from "./utils/interceptors";

const AppProvider = () => {
  useEffect(() => {
    useInterceptors();
  }, []);
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={routes.LOGIN} element={<LoginScreen />} />
          <Route path={routes.SIGNUP} element={<SignUpScreen />} />
          <Route
            path={routes.FORGOT_PASSWORD}
            element={<ForgotPasswordScreen />}
          />
          <Route element={<ProtectedRoutes />}>
            <Route path={routes.MY_PAGE} element={<MyPageScreen />} />
            <Route path={routes.RUNZ} element={<RunzScreen />} />
            <Route path={routes.RUNZ_EIDT} element={<RunzEditScreen />} />

            <Route path={routes.PROCEDURES} element={<ProceduresScreen />} />
            <Route
              path={routes.PROCEDURE_EDIT}
              element={<ProceduresEditScreen />}
            />
            <Route path={routes.PROJECTS} element={<ProjectsScreen />} />
            <Route path={routes.ASSETS} element={<AssetsScreen />} />
            <Route path={routes.SETTINGS} element={<SettingsScreen />} />
            <Route path={routes.BILLING} element={<BillingScreen />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppProvider;
