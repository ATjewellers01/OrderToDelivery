import { RouterProvider } from "react-router";
import { createRouter } from "./routes";
import { AppProvider } from "./context/AppContext";

// ERP System Entry Point
export default function App() {
  return (
    <AppProvider>
      <AppRouterWrapper />
    </AppProvider>
  );
}

// Separate component to ensure router is created inside AppProvider
function AppRouterWrapper() {
  const router = createRouter();
  return <RouterProvider router={router} />;
}