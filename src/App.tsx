import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { routes } from "./routes/routesPath";
import LoginScreen from "./modules/LoginModule/LoginScreen";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import MyPageScreen from "./modules/MyPageModule/MyPageScreen";
import PageNotFound from "./utils/PageNotFound";
import SignUpScreen from "./modules/LoginModule/SignUpScreen";
import ForgotPasswordScreen from "./modules/LoginModule/ForgotPasswordScreen";
import Layout from "./common/Layout/Layout";
import RunzScreen from "./modules/RunzModule/RunzScreen";
import ProceduresScreen from "./modules/ProceduresModule/ProceduresScreen";
import ProjectsScreen from "./modules/ProjectsModule/ProjectsScreen";
import AssetsScreen from "./modules/AssetsModule/AssetsScreen";
import SettingsScreen from "./modules/SettingsModule/SettingsScreen";
import BillingScreen from "./modules/BillingModule/BillingScreen";
import store from "./redux/store";
import ProceduresEditScreen from "./modules/ProceduresModule/ProceduresEditScreen";
import RunzEditScreen from "./modules/RunzModule/RunzEditScreen";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
