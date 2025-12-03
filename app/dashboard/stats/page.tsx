"use client";

import { useEffect, useState } from "react";
import { statsApi } from "@/lib/api/stats";
import type { Stats, StatsInput } from "@/lib/types/stats";

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [formData, setFormData] = useState<StatsInput>({
    ProjectComplete: 0,
    HappyClient: 0,
    ClientSatisfaction: 0,
    Experience: 0,
    Support: "24/7",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await statsApi.getStats();
        const first = data[0] ?? null;
        if (first) {
          setStats(first);
          setFormData({
            ProjectComplete: first.ProjectComplete,
            HappyClient: first.HappyClient,
            ClientSatisfaction: first.ClientSatisfaction,
            Experience: first.Experience,
            Support: first.Support,
          });
        }
      } catch (err: any) {
        console.error("Error fetching stats:", err);
        setError(err.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "Support") {
      setFormData((prev) => ({
        ...prev,
        Support: value,
      }));
    } else {
      const numericValue = Number(value);
      setFormData((prev) => ({
        ...prev,
        [name]: isNaN(numericValue) ? 0 : numericValue,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let result: Stats;
      if (stats) {
        // Update existing stats document
        result = await statsApi.updateStats(stats._id, formData);
      } else {
        // Create new stats document
        result = await statsApi.createStats(formData);
      }

      setStats(result);
      alert("Stats saved successfully!");
    } catch (err: any) {
      console.error("Error saving stats:", err);
      setError(err.message || "Failed to save stats");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-xl text-white">Loading stats...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Company Stats</h1>
        <p className="text-zinc-400">
          Enter and manage your company statistics. These values are stored in
          your backend MongoDB via the stats API.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-white mb-4">
          {stats ? "Update Stats" : "Create Stats"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Projects Completed
            </label>
            <input
              type="number"
              name="ProjectComplete"
              value={formData.ProjectComplete}
              onChange={handleChange}
              className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Happy Clients
            </label>
            <input
              type="number"
              name="HappyClient"
              value={formData.HappyClient}
              onChange={handleChange}
              className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Client Satisfaction (%)
            </label>
            <input
              type="number"
              name="ClientSatisfaction"
              value={formData.ClientSatisfaction}
              onChange={handleChange}
              className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              name="Experience"
              value={formData.Experience}
              onChange={handleChange}
              className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Support Format
            </label>
            <input
              type="text"
              name="Support"
              value={formData.Support}
              onChange={handleChange}
              className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="24/7"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving
            ? stats
              ? "Updating..."
              : "Creating..."
            : stats
            ? "Update Stats"
            : "Create Stats"}
        </button>
      </form>

      {/* Preview cards (read-only display of current values) */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">
          Current Stats Preview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            label="Projects Completed"
            value={formData.ProjectComplete}
          />
          <StatCard label="Happy Clients" value={formData.HappyClient} />
          <StatCard
            label="Client Satisfaction (%)"
            value={formData.ClientSatisfaction}
          />
          <StatCard label="Years of Experience" value={formData.Experience} />
          <StatCard label="Support Availability" value={formData.Support} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
      <p className="text-sm text-zinc-400 mb-2">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
