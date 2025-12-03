"use client";

import { FounderFormData } from "@/lib/types/founder";

interface FounderFormProps {
  formData: FounderFormData;
  isCreating: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel?: () => void;
}

export default function FounderForm({
  formData,
  isCreating,
  onSubmit,
  onChange,
  onFileChange,
  onCancel,
}: FounderFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-800"
    >
      <h2 className="text-2xl font-semibold mb-6 text-white">
        {isCreating ? "Create Founder Profile" : "Edit Founder Profile"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">
            Position *
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={onChange}
            required
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">
            Quote *
          </label>
          <textarea
            name="quote"
            value={formData.quote}
            onChange={onChange}
            required
            rows={2}
            placeholder="A short inspirational quote..."
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">
            Details *
          </label>
          <textarea
            name="details"
            value={formData.details}
            onChange={onChange}
            required
            rows={4}
            placeholder="Detailed information about the founder..."
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">
              LinkedIn
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={onChange}
              placeholder="https://linkedin.com/in/..."
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">
              Twitter
            </label>
            <input
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={onChange}
              placeholder="https://twitter.com/..."
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="email@example.com"
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">
            Avatar
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-zinc-700 file:text-white hover:file:bg-zinc-600"
          />
          <p className="text-xs text-zinc-500 mt-1">Maximum file size: 10MB</p>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {isCreating ? "Create" : "Update"}
        </button>
        {!isCreating && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-zinc-700 text-white rounded-md hover:bg-zinc-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
