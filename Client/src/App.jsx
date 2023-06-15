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

const ROLES = {
  User: 1000,
  Admin: 5150,
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
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

// function App() {
//   const { activeMenu, screenSize } = useContent();
//   return (
//     <div className="bg-main-dark-bg relative flex">
//       {activeMenu ? (
//         <div
//           className={`sidebar bg-secondary-dark-bg fixed ${
//             screenSize > 1000 ? "w-48" : "w-full"
//           }`}
//         >
//           <Sidebar />
//         </div>
//       ) : (
//         <div className="bg-secondary-dark-bg w-0 ">
//           <Sidebar />
//         </div>
//       )}
//       <div
//         className={`bg-main-dark-bg  min-h-screen w-full ${
//           activeMenu ? "md:ml-48" : "flex-2"
//         }`}
//       >
//         <div className="bg-main-dark-bg navbar  fixed w-full md:static">
//           <Navbar />
//         </div>

//         <div className={screenSize <= 786 ? "mb-20 mt-28" : "mb-20 mt-5"}>
//           <Routes>
//             <Route path="/" element={<Layout />}>
//               {/* Public Routes */}
//               {/* we want to protect these routes */}
//               <Route element={<PersistLogin />}>
//                 <Route path="/" element={<Home />} />
//                 <Route path="unauthorized" element={<Unauthorized />} />
//                 <Route path="prayerlimit" element={<PrayerLimit />} />
//                 <Route path="bookmark" element={<Bookmark />} />

//                 <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
//                   <Route path="admin" element={<Admin />} />
//                   <Route path="adminregister" element={<AdminRegister />} />
//                   <Route path="requesthandler" element={<RequestHandler />} />
//                 </Route>
//                 <Route
//                   element={
//                     <RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />
//                   }
//                 >
//                   <Route path="edit" element={<EditNamazTime />} />
//                   <Route path="profile" element={<Profile />} />
//                   <Route path="editprofile" element={<EditProfile />} />
//                 </Route>
//               </Route>
//               {/* catch all */}
//               <Route path="*" element={<Missing />} />
//             </Route>
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }
