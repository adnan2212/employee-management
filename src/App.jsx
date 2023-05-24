import FirstPage from "./pages/firstPage";
import SecondPage from "./pages/secondPage";
import Footer from "./components/Footer";
import MyForm from "./components/MyForm";
import ProgressBar from "./components/ProgressBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <FirstPage />
  },
  {
    path: "/projects",
    element: <SecondPage />
  },
  { path: "/form", element: <MyForm /> }
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
      <Footer />
    </div>
  );
};

export default App;
