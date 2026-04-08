import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { useApp } from "../context/AppContext";
import {
  LayoutDashboard,
  Package,
  Flame,
  ClipboardList,
  ArrowRightLeft,
  ArrowLeftRight,
  UserCheck,
  FileText,
  LogOut,
  Menu,
  X,
  Gem,
  Clock,
  Monitor,
  Zap,
  Sparkles,
  Truck,
  History,
  Inbox,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export const Layout = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDashboardsOpen, setIsDashboardsOpen] = useState(true); // Default to open for visibility


  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navigation = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, roles: ["Admin", "Production Head", "Dept Manager", "Karigar", "QC", "User"] },
    { name: "Order Details", path: "/order-details", icon: ClipboardList, roles: ["Admin", "Production Head", "User"] },
    { name: "Metal Issue", path: "/metal-issue", icon: Flame, roles: ["Admin", "Production Head", "User"] },
    { name: "Flw Up", path: "/flw-up", icon: ArrowRightLeft, roles: ["Admin", "User", "Dept Manager"] },
    { name: "QC-1", path: "/qc-1", icon: FileText, roles: ["Admin", "QC", "User"] },
    { name: "Ghat Jama", path: "/ghat-jama", icon: Package, roles: ["Admin", "Production Head", "User"] },
    { name: "Meena Inhouse", path: "/meena-inhouse", icon: ArrowLeftRight, roles: ["Admin", "User"] },
    { name: "Meena Outside", path: "/meena-outside", icon: ArrowLeftRight, roles: ["Admin", "User"] },
    { name: "Polish Inhouse", path: "/polish-inhouse", icon: UserCheck, roles: ["Admin", "User"] },
    { name: "Polish Outside", path: "/polish-outside", icon: UserCheck, roles: ["Admin", "User"] },
    { name: "QC-2", path: "/qc-2", icon: FileText, roles: ["Admin", "QC", "User"] },
    { name: "Dispatch Dept", path: "/dispatch-department", icon: Package, roles: ["Admin", "User"] },
    { name: "Receipt Dept", path: "/receipt-department", icon: Package, roles: ["Admin", "User"] },
    { name: "QC-3", path: "/qc-3", icon: FileText, roles: ["Admin", "QC", "User"] },
    { name: "Huid/Label", path: "/huid-label", icon: FileText, roles: ["Admin", "User"] },
    { name: "Received in Stock", path: "/received-in-stock", icon: Package, roles: ["Admin", "User"] },
    { name: "Delivery", path: "/delivery", icon: Package, roles: ["Admin", "User"] },
    { name: "Bangle Polish", path: "/bangle-polish", icon: UserCheck, roles: ["Admin", "User"] },
    { name: "E-Polish", path: "/e-polish", icon: UserCheck, roles: ["Admin", "User"] },
  ];

  const dashboardSubItems = [
    { name: "Follow-Up Dashboard", path: "/follow-up-new", icon: ArrowRightLeft, roles: ["Admin", "User", "Dept Manager"] },
    { name: "Karigar Report", path: "/karigar-report", icon: FileText, roles: ["Admin", "User", "Dept Manager"] },
    { name: "On Time Delivery", path: "/on-time-delivery", icon: Clock, roles: ["Admin", "User", "Dept Manager"] },
    { name: "PC Dashboard", path: "/pc-dashboard", icon: Monitor, roles: ["Admin", "User", "Dept Manager"] },
    { name: "Meena Details", path: "/meena-details", icon: Zap, roles: ["Admin", "User"] },
    { name: "Polish Details", path: "/polish-details", icon: Sparkles, roles: ["Admin", "User"] },
    { name: "Ready for Dispatch", path: "/ready-for-dispatch", icon: Truck, roles: ["Admin", "User"] },
    { name: "Dispatch History", path: "/dispatch-history", icon: History, roles: ["Admin", "User"] },
    { name: "RD", path: "/rd", icon: Inbox, roles: ["Admin", "User"] },
  ];

  const allowedNavigation = navigation.filter(
    (item) => user && item.roles.includes(user.role)
  );

  const allowedSubNavigation = dashboardSubItems.filter(
    (item) => user && item.roles.includes(user.role)
  );


  // Bottom tab bar shows first 5 allowed items
  const bottomTabs = allowedNavigation.slice(0, 5);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* ── Header ───────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between">
          {/* Left: Hamburger (mobile) + Logo */}
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Gem className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base font-semibold text-gray-900 leading-tight">
                 ORDER TO DELIVERY
                </h1>
                <p className="text-xs text-gray-500">Handmade Jewellery Unit</p>
              </div>
            </div>
          </div>

          {/* Right: User info + Logout */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 leading-tight">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Sidebar Overlay ────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[100] md:hidden"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeSidebar}
          />

          {/* Drawer */}
          <aside className="absolute top-0 left-0 h-full w-72 bg-white shadow-2xl flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Gem className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">AT PLUS ERP</p>
                  <p className="text-xs text-gray-500">Handmade Jewellery Unit</p>
                </div>
              </div>
              <button
                onClick={closeSidebar}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User badge */}
            <div className="px-5 py-3 bg-amber-50 border-b border-amber-100">
              <p className="text-sm font-semibold text-amber-900">{user?.username}</p>
              <p className="text-xs text-amber-700">{user?.role}</p>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
              {allowedNavigation.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                // Render sub-menu after the first item (Dashboard)
                return (
                  <div key={item.path}>
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.path}
                        onClick={closeSidebar}
                        className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${isActive
                          ? "bg-amber-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {item.name}
                      </Link>
                      
                      {index === 0 && allowedSubNavigation.length > 0 && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setIsDashboardsOpen(!isDashboardsOpen);
                          }}
                          className={`ml-1 p-2.5 rounded-xl transition-colors ${isDashboardsOpen ? "bg-amber-100 text-amber-700" : "text-gray-400 hover:bg-gray-100"}`}
                        >
                          {isDashboardsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      )}
                    </div>

                    {index === 0 && isDashboardsOpen && allowedSubNavigation.length > 0 && (
                      <div className="pl-4 mt-1 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                        {allowedSubNavigation.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = location.pathname === subItem.path;
                          return (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              onClick={closeSidebar}
                              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-[13px] font-medium ${isSubActive
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                              <SubIcon className="w-4 h-4 flex-shrink-0" />
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Logout at bottom */}
            <div className="p-3 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── Body ─────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 h-[calc(100vh-57px-28px)] sticky top-[57px] self-start overflow-y-auto">
          <nav className="p-4 space-y-0.5">
            {allowedNavigation.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <div key={item.path}>
                  <div className="flex items-center justify-between group">
                    <Link
                      to={item.path}
                      className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${isActive
                        ? "bg-amber-50 text-amber-900"
                        : "text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {item.name}
                    </Link>
                    
                    {index === 0 && allowedSubNavigation.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsDashboardsOpen(!isDashboardsOpen);
                        }}
                        className={`ml-1 p-2 rounded-lg transition-colors ${isDashboardsOpen ? "text-amber-600 bg-amber-50" : "text-gray-400 hover:bg-gray-100"}`}
                        title="Toggle Operational Dashboards"
                      >
                        {isDashboardsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    )}
                  </div>

                  {index === 0 && isDashboardsOpen && allowedSubNavigation.length > 0 && (
                    <div className="pl-4 border-l-2 border-amber-100 ml-6 mt-1 space-y-0.5 animate-in slide-in-from-left-2 duration-300">
                      {allowedSubNavigation.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = location.pathname === subItem.path;
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-[13px] font-medium ${isSubActive
                              ? "bg-amber-50 text-amber-900 shadow-sm"
                              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                          >
                            <SubIcon className="w-4 h-4 flex-shrink-0" />
                            {subItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-3 md:p-6 min-w-0 overflow-y-auto h-[calc(100vh-57px-28px)] pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>

      {/* ── Mobile Bottom Tab Bar ─────────────────────── */}
      <nav className="md:hidden fixed bottom-7 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-t border-gray-200 flex h-14 items-center">
        {bottomTabs.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full relative transition-all ${isActive ? "text-amber-600 scale-105" : "text-gray-400 hover:text-gray-600"
                }`}
            >
              <Icon className={`${isActive ? "w-6 h-6" : "w-5 h-5"} transition-all`} />
              <span className={`text-[9px] font-bold uppercase tracking-tighter text-center px-1 truncate w-full ${isActive ? "opacity-100" : "opacity-70"}`}>
                {item.name.split(" ")[0]}
              </span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-amber-500 rounded-b-full shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Fixed Footer ─────────────────────────────── */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 h-7 flex items-center justify-center bg-white border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Powered by{" "}
          <a
            href="https://www.botivate.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-amber-600 hover:text-amber-700 hover:underline transition-colors"
          >
            Botivate
          </a>
        </p>
      </footer>
    </div>
  );
};