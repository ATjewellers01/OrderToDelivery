import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { OrderDetails } from "./pages/OrderDetails";
import { MetalIssue } from "./pages/MetalIssue";
import { FlwUp } from "./pages/FlwUp";
import { FollowUpNew } from "./pages/follow-up/FollowUpNew";
import { KarigarReport } from "./pages/KarigarReport";
import { QC1 } from "./pages/QC1";
import { GhatJama } from "./pages/GhatJama";
import { MeenaInhouse } from "./pages/MeenaInhouse";
import { MeenaOutside } from "./pages/MeenaOutside";
import { PolishInhouse } from "./pages/PolishInhouse";
import { PolishOutside } from "./pages/PolishOutside";
import { QC2 } from "./pages/QC2";
import { DispatchDepartment } from "./pages/DispatchDepartment";
import { ReceiptDepartment } from "./pages/ReceiptDepartment";
import { QC3 } from "./pages/QC3";
import { HuidLabel } from "./pages/HuidLabel";
import { ReceivedInStock } from "./pages/ReceivedInStock";
import { Delivery } from "./pages/Delivery";
import { BanglePolish } from "./pages/BanglePolish";
import { EPolish } from "./pages/EPolish";
import { OnTimeDelivery } from "./pages/OnTimeDelivery";
import { PCDashboard } from "./pages/PCDashboard";
import { MeenaDetails } from "./pages/MeenaDetails";
import { PolishDetails } from "./pages/PolishDetails";
import { ReadyForDispatch } from "./pages/ReadyForDispatch";
import { DispatchHistory } from "./pages/DispatchHistory";
import { RD } from "./pages/RD";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RootLayout } from "./components/RootLayout";

// Wrapper components to defer rendering until inside AppProvider
const withAuth = (Component: React.FC) => () => (
  <ProtectedRoute>
    <Component />
  </ProtectedRoute>
);

export const createRouter = () => createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        Component: Layout,
        children: [
          { path: "dashboard", Component: withAuth(Dashboard) },
          { path: "order-details", Component: withAuth(OrderDetails) },
          { path: "metal-issue", Component: withAuth(MetalIssue) },
          { path: "flw-up", Component: withAuth(FlwUp) },
          { path: "follow-up-new", Component: withAuth(FollowUpNew) },
          { path: "karigar-report", Component: withAuth(KarigarReport) },
          { path: "qc-1", Component: withAuth(QC1) },
          { path: "ghat-jama", Component: withAuth(GhatJama) },
          { path: "meena-inhouse", Component: withAuth(MeenaInhouse) },
          { path: "meena-outside", Component: withAuth(MeenaOutside) },
          { path: "polish-inhouse", Component: withAuth(PolishInhouse) },
          { path: "polish-outside", Component: withAuth(PolishOutside) },
          { path: "qc-2", Component: withAuth(QC2) },
          { path: "dispatch-department", Component: withAuth(DispatchDepartment) },
          { path: "receipt-department", Component: withAuth(ReceiptDepartment) },
          { path: "qc-3", Component: withAuth(QC3) },
          { path: "huid-label", Component: withAuth(HuidLabel) },
          { path: "received-in-stock", Component: withAuth(ReceivedInStock) },
          { path: "delivery", Component: withAuth(Delivery) },
          { path: "bangle-polish", Component: withAuth(BanglePolish) },
          { path: "e-polish", Component: withAuth(EPolish) },
          { path: "on-time-delivery", Component: withAuth(OnTimeDelivery) },
          { path: "pc-dashboard", Component: withAuth(PCDashboard) },
          { path: "meena-details", Component: withAuth(MeenaDetails) },
          { path: "polish-details", Component: withAuth(PolishDetails) },
          { path: "ready-for-dispatch", Component: withAuth(ReadyForDispatch) },
          { path: "dispatch-history", Component: withAuth(DispatchHistory) },
          { path: "rd", Component: withAuth(RD) },
        ],
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
