import { Outlet } from "react-router-dom";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu, X, LayoutDashboard, Package,
  ClipboardCheck, ShoppingCart, Users,
  BarChart3, PlusCircle, LogOut, Store
} from "lucide-react";

const menus = {
  admin: [
    ["Dashboard", LayoutDashboard, "/admin"],
    ["Products", Package, "/admin/products"],
    ["Approvals", ClipboardCheck, "/admin/approvals"],
    ["Users", Users, "/admin/users"],
    ["Orders", ShoppingCart, "/admin/orders"]
  ],
  salesperson: [
    ["Dashboard", LayoutDashboard, "/sales"],
    ["My Products", Package, "/sales/products"],
    ["Add Product", PlusCircle, "/sales/add"],
    ["Orders", ShoppingCart, "/sales/orders"],
    ["Sales", BarChart3, "/sales/reports"]
  ],
  customer: [
    ["Shop", Store, "/customer"],
    ["Cart", ShoppingCart, "/customer/cart"],
    ["My Orders", Package, "/customer/orders"]
  ]
};

export default function DashboardLayout({
  role,
  activePage,
  children
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const items = menus[role] || menus.customer;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  const SidebarContent = () => (
    <>
      <div className="flex h-20 items-center gap-3
                      border-b border-slate-800 px-5">
        <Store className="text-orange-500" size={28} />
        <span className="text-2xl font-bold text-white">
          SwaGlow
        </span>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {items.map(([label, Icon, path]) => (
          <button
            key={path}
            onClick={() => {
              navigate(path);
              setMobileOpen(false);
            }}
            className={`flex w-full items-center gap-3
              rounded-xl px-4 py-3 text-left transition
              ${activePage === label
                ? "bg-orange-500 text-white"
                : "text-slate-300 hover:bg-slate-800"
              }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3
                     rounded-xl px-4 py-3 text-red-400
                     hover:bg-red-500/10"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen w-full bg-slate-50">

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40
                        hidden w-64 flex-col bg-slate-950
                        lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile and tablet drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 w-full
                       bg-black/50"
          />

          <aside className="relative flex h-full w-72
                            max-w-[85vw] flex-col
                            bg-slate-950">
            <button
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-6
                         text-white"
            >
              <X size={24} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="min-w-0 lg:ml-64">

        <header className="sticky top-0 z-30 flex h-16
                           items-center justify-between
                           border-b bg-white px-4
                           sm:px-6 lg:h-20 lg:px-8">

          <div className="flex items-center gap-4">
            <button
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 hover:bg-gray-100
                         lg:hidden"
            >
              <Menu size={24} />
            </button>

            <h1 className="text-lg font-bold capitalize
                           sm:text-xl">
              {role} Dashboard
            </h1>
          </div>

          <div className="flex h-10 w-10 items-center
                          justify-center rounded-full
                          bg-orange-100 font-bold
                          text-orange-600">
            {role[0].toUpperCase()}
          </div>
        </header>

        <main className="w-full min-w-0 p-4
                         sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
