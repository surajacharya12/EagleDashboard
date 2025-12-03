"use client";

import Link from "next/link";
import {
  FiUser,
  FiBriefcase,
  FiFolder,
  FiUsers,
  FiMessageSquare,
  FiFileText,
  FiInfo,
  FiMail,
} from "react-icons/fi";

export default function DashboardHome() {
  const stats = [
    {
      name: "Founder Profile",
      value: "1",
      icon: FiUser,
      color: "blue",
      href: "/dashboard/founder",
    },
    {
      name: "Services",
      value: "0",
      icon: FiBriefcase,
      color: "purple",
      href: "/dashboard/services",
    },
    {
      name: "Projects",
      value: "0",
      icon: FiFolder,
      color: "green",
      href: "/dashboard/projects",
    },
    {
      name: "Team Members",
      value: "0",
      icon: FiUsers,
      color: "orange",
      href: "/dashboard/team",
    },
    {
      name: "Testimonials",
      value: "0",
      icon: FiMessageSquare,
      color: "pink",
      href: "/dashboard/testimonials",
    },
    {
      name: "Blog Posts",
      value: "0",
      icon: FiFileText,
      color: "indigo",
      href: "/dashboard/blog",
    },
  ];

  const quickActions = [
    {
      title: "Manage Founder",
      description: "Update founder profile and information",
      icon: FiUser,
      href: "/dashboard/founder",
      color: "blue",
    },
    {
      title: "About Company",
      description: "Edit company information and mission",
      icon: FiInfo,
      href: "/dashboard/about",
      color: "purple",
    },
    {
      title: "Add Service",
      description: "Create new service offerings",
      icon: FiBriefcase,
      href: "/dashboard/services",
      color: "green",
    },
    {
      title: "Add Project",
      description: "Showcase your latest projects",
      icon: FiFolder,
      href: "/dashboard/projects",
      color: "orange",
    },
    {
      title: "Add Team Member",
      description: "Add new team members",
      icon: FiUsers,
      href: "/dashboard/team",
      color: "pink",
    },
    {
      title: "Contact Messages",
      description: "View and manage contact inquiries",
      icon: FiMail,
      href: "/dashboard/contact",
      color: "indigo",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome to Company Dashboard
        </h1>
        <p className="text-zinc-400">
          Manage all aspects of your company website
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-all hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-zinc-800 rounded-lg">
                  <Icon className="text-white" size={24} />
                </div>
                <span className="text-3xl font-bold text-white">
                  {stat.value}
                </span>
              </div>
              <h3 className="text-sm font-medium text-zinc-400">{stat.name}</h3>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="p-4 bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 rounded-lg transition-all hover:border-zinc-600 group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-zinc-800 transition-colors">
                    <Icon className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-zinc-300">
              Dashboard initialized successfully
            </p>
            <span className="text-xs text-zinc-500 ml-auto">Just now</span>
          </div>
          <div className="text-center py-8 text-zinc-500">
            <p>No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
}
