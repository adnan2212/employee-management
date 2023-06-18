import { Route, Routes } from "react-router-dom";

import { SigninForm, LoginForm } from "./components/Authentication";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FirstPage from "./pages/firstPage";
import SecondPage from "./pages/secondPage";
import Unauthorized from "./pages/Unauthorized";
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
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}
          >
            <Route path="/" element={<FirstPage />} />
            {/* <Route path="unauthorized" element={<Unauthorized />} /> */}

            <Route path="yourTaskData" element={<UserTaskData />} />
            <Route path="projects" element={<SecondPage />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
          > 
            <Route path="data" element={<AllUsersTaskData />} />
            <Route path="checker" element={<AlliedChecker />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

