import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { SigninForm } from "./components/Authentication";

import FirstPage from "./pages/firstPage";
import SecondPage from "./pages/secondPage";
import MyForm from "./components/MyForm";

const appRouter = createBrowserRouter([
  {
    path: "/signin",
    element: <SigninForm />,
  },
  {
    path: "/",
    element: <FirstPage />
  },
  {
    path: "/projects",
    element: <SecondPage />
  },
  {
    path: "/form",
    element: <MyForm />
  }
]);

const App = () => {
  return (
    <div>
      <ChakraProvider>
        <RouterProvider router={appRouter}></RouterProvider>
      </ChakraProvider>
    </div>
  );
};

export default App;
