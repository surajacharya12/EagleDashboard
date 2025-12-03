"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiUser,
  FiMenu,
  FiX,
  FiSettings,
  FiLogOut,
  FiInfo,
  FiBriefcase,
  FiFolder,
  FiUsers,
  FiMessageSquare,
  FiFileText,
  FiMail,
} from "react-icons/fi";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: FiHome },
    { name: "Founder", href: "/dashboard/founder", icon: FiUser },
    { name: "About Us", href: "/dashboard/about", icon: FiInfo },
    { name: "Services", href: "/dashboard/services", icon: FiBriefcase },
    { name: "Projects", href: "/dashboard/projects", icon: FiFolder },
    { name: "Team", href: "/dashboard/team", icon: FiUsers },
    {
      name: "Testimonials",
      href: "/dashboard/testimonials",
      icon: FiMessageSquare,
    },
    { name: "Blog", href: "/dashboard/blog", icon: FiFileText },
    { name: "Contact", href: "/dashboard/contact", icon: FiMail },
    { name: "Settings", href: "/dashboard/settings", icon: FiSettings },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-900 rounded-lg text-white"
      >
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-zinc-900 border-r border-zinc-800 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-zinc-800">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Company CMS
            </h1>
            <p className="text-sm text-zinc-400 mt-1">Content Management</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-600 text-white"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-zinc-800">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors">
              <FiLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
