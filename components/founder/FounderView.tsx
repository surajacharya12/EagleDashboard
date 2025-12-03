"use client";

import { Founder } from "@/lib/types/founder";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface FounderViewProps {
  founder: Founder;
  onEdit: () => void;
  onDelete: () => void;
}

export default function FounderView({
  founder,
  onEdit,
  onDelete,
}: FounderViewProps) {
  return (
    <div className="bg-zinc-900 rounded-lg shadow-lg border border-zinc-800">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-zinc-800">
        <h2 className="text-2xl font-semibold text-white">Founder Profile</h2>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FiEdit size={18} />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <FiTrash2 size={18} />
            Delete
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Avatar Section */}
          <div className="md:col-span-1">
            {founder.avatar ? (
              <img
                src={founder.avatar}
                alt={founder.name}
                className="w-full aspect-square rounded-lg object-cover border-2 border-zinc-700"
              />
            ) : (
              <div className="w-full aspect-square rounded-lg bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center">
                <span className="text-4xl text-zinc-600">
                  {founder.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-1">Name</h3>
              <p className="text-xl font-semibold text-white">{founder.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-1">
                Position
              </h3>
              <p className="text-lg text-white">{founder.position}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-1">Quote</h3>
              <p className="text-lg text-white italic">"{founder.quote}"</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-1">
                Details
              </h3>
              <p className="text-base text-zinc-300 leading-relaxed">
                {founder.details}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-2">
                Social Media
              </h3>
              <div className="space-y-2">
                {founder.socialMedia.linkedin && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-400 w-20">
                      LinkedIn:
                    </span>
                    <a
                      href={founder.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 hover:underline text-sm"
                    >
                      {founder.socialMedia.linkedin}
                    </a>
                  </div>
                )}
                {founder.socialMedia.twitter && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-400 w-20">
                      Twitter:
                    </span>
                    <a
                      href={founder.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 hover:underline text-sm"
                    >
                      {founder.socialMedia.twitter}
                    </a>
                  </div>
                )}
                {founder.socialMedia.email && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-400 w-20">
                      Email:
                    </span>
                    <a
                      href={`mailto:${founder.socialMedia.email}`}
                      className="text-blue-400 hover:text-blue-300 hover:underline text-sm"
                    >
                      {founder.socialMedia.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
