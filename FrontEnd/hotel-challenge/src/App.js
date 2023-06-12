import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ApiController from "./components/Routes/ApiController";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/Routes/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/api",
        element: <ApiController />
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
