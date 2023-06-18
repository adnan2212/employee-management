import { Route, Routes, useLocation } from "react-router-dom";

import Logo from "./components/Logo";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
// import { SigninForm, LoginForm } from "./components/Authentication";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Profile from "./pages/Profile";
import UserTaskData from "./components/UserTaskData";
import AllUsersTaskData from "./components/AllUsersTaskData";
import AlliedChecker from "./components/AlliedChecker";

const ROLES = {
  User: 1000,
  Admin: 5150
};

function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <Logo />
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}
            >
              <Route path="/" element={<Dashboard />} />
              {/* <Route path="unauthorized" element={<Unauthorized />} /> */}
              <Route path="yourTaskData" element={<UserTaskData />} />
              <Route path="projects" element={<Projects />} />
              <Route path="profile" element={<Profile />} />
              <Route path="data" element={<AllUsersTaskData />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="allied-checker" element={<AlliedChecker />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;

