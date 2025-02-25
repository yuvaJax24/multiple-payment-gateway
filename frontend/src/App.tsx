import { RouterProvider } from "react-router-dom";
import { mainRoutes } from "./routes";

function App() {
  return <RouterProvider router={mainRoutes} />;
}

export default App;
