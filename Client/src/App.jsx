import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import { SigninForm, LoginForm } from "./components/Authentication";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import FirstPage from "./pages/firstPage";
import SecondPage from "./pages/secondPage";
import MyForm from "./components/MyForm";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

const ROLES = {
  User: 1000,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route
          element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}
        >
          <Route path="/" element={<FirstPage />} />
          {/* <Route path="unauthorized" element={<Unauthorized />} /> */}
          <Route path="projects" element={<SecondPage />} />
          <Route path="form" element={<MyForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

/* const appRouter = createBrowserRouter([
  {
    path: "/signin",
    element: <SigninForm />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <FirstPage />,
  },
  {
    path: "/projects",
    element: <SecondPage />,
  },
  {
    path: "/form",
    element: <MyForm />,
  },
]);

const App = () => {
  return (
    // <BrowserRouter>
    <ChakraProvider>
      <RouterProvider router={appRouter}></RouterProvider>
    </ChakraProvider>
    // </BrowserRouter>
  );
};

export default App;
 */
