import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { SigninForm } from "./components/Authentication";

import FirstPage from "./pages/firstPage";
import SecondPage from "./pages/secondPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <FirstPage />,
  },
  {
    path: "/projects",
    element: <SecondPage />,
  },
  {
    path: "/signin",
    element: <SigninForm />,
  },
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
