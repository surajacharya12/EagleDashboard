"use client";

import { useState, useEffect } from "react";
import { Founder, FounderFormData } from "@/lib/types/founder";
import { founderApi } from "@/lib/api/founder";
import FounderForm from "@/components/founder/FounderForm";
import FounderView from "@/components/founder/FounderView";

export default function FounderPage() {
  const [founder, setFounder] = useState<Founder | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FounderFormData>({
    name: "",
    position: "",
    quote: "",
    details: "",
    linkedin: "",
    twitter: "",
    email: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    fetchFounder();
  }, []);

  const fetchFounder = async () => {
    try {
      const data = await founderApi.getFounder();
      if (data.success && data.data) {
        setFounder(data.data);
        setFormData({
          name: data.data.name,
          position: data.data.position,
          quote: data.data.quote,
          details: data.data.details,
          linkedin: data.data.socialMedia.linkedin,
          twitter: data.data.socialMedia.twitter,
          email: data.data.socialMedia.email,
        });
      } else {
        setIsCreating(true);
      }
    } catch (error) {
      console.error("Error fetching founder:", error);
      setIsCreating(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await founderApi.createFounder(formData, avatarFile);
      if (data.success) {
        setFounder(data.data);
        setIsCreating(false);
        setAvatarFile(null);
        alert("Founder created successfully!");
      }
    } catch (error: any) {
      console.error("Error creating founder:", error);
      alert(error.message || "Failed to create founder");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!founder) return;

    try {
      const data = await founderApi.updateFounder(
        founder._id,
        formData,
        avatarFile
      );
      if (data.success) {
        setFounder(data.data);
        setIsEditing(false);
        setAvatarFile(null);
        alert("Founder updated successfully!");
      }
    } catch (error: any) {
      console.error("Error updating founder:", error);
      alert(error.message || "Failed to update founder");
    }
  };

  const handleDelete = async () => {
    if (!founder || !confirm("Are you sure you want to delete this founder?"))
      return;

    try {
      const data = await founderApi.deleteFounder(founder._id);
      if (data.success) {
        setFounder(null);
        setIsCreating(true);
        alert("Founder deleted successfully!");
      }
    } catch (error: any) {
      console.error("Error deleting founder:", error);
      alert(error.message || "Failed to delete founder");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarFile(null);
    if (founder) {
      setFormData({
        name: founder.name,
        position: founder.position,
        quote: founder.quote,
        details: founder.details,
        linkedin: founder.socialMedia.linkedin,
        twitter: founder.socialMedia.twitter,
        email: founder.socialMedia.email,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Founder Management
        </h1>
        <p className="text-zinc-400">
          Manage your founder profile and information
        </p>
      </div>

      {isCreating || isEditing ? (
        <FounderForm
          formData={formData}
          isCreating={isCreating}
          onSubmit={isCreating ? handleCreate : handleUpdate}
          onChange={handleInputChange}
          onFileChange={handleFileChange}
          onCancel={!isCreating ? handleCancel : undefined}
        />
      ) : founder ? (
        <FounderView
          founder={founder}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : null}
    </div>
  );
}
