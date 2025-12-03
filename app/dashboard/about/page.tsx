"use client";

import { useEffect, useState } from "react";
import { aboutApi } from "@/lib/api/about";
import type {
  About,
  AboutInput,
  CoreValue,
  OfferCategory,
} from "@/lib/types/about";

const defaultCoreValues: CoreValue[] = [
  {
    icon: "💡",
    title: "Innovation",
    desc: "We challenge norms and craft creative, forward-thinking solutions.",
    bg: "bg-blue-100 text-blue-600",
  },
  {
    icon: "🤝",
    title: "Collaboration",
    desc: "We build success together through teamwork and transparent communication.",
    bg: "bg-green-100 text-green-600",
  },
  {
    icon: "🏆",
    title: "Excellence",
    desc: "We deliver high-quality experiences with precision and consistency.",
    bg: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: "🧭",
    title: "Integrity",
    desc: "We operate with honesty, ethics, and accountability in everything we do.",
    bg: "bg-purple-100 text-purple-600",
  },
  {
    icon: "❤️",
    title: "Customer-Centric",
    desc: "Every decision is made with empathy and understanding for real user needs.",
    bg: "bg-pink-100 text-pink-600",
  },
  {
    icon: "🔮",
    title: "Future-Focused",
    desc: "We embrace modern technologies to prepare clients for tomorrow.",
    bg: "bg-indigo-100 text-indigo-600",
  },
];

const defaultWhatWeOffer: OfferCategory[] = [
  {
    section: "Services-Based Solutions",
    items: [
      { title: "Custom Software Development" },
      { title: "Consulting & Strategy" },
      { title: "Cloud Solutions & Migration" },
      { title: "Digital Transformation" },
      { title: "Maintenance & Support" },
    ],
  },
  {
    section: "Product-Based Solutions",
    items: [
      { title: "SaaS Platforms & Applications" },
      { title: "Enterprise Software Solutions" },
      { title: "Mobile & Web Applications" },
      { title: "AI & Automation Tools" },
      { title: "Analytics & Business Intelligence" },
    ],
  },
];

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [formData, setFormData] = useState<AboutInput>({
    vision:
      "To be the global leader in delivering transformative services and innovative products that shape a smarter world.",
    mission:
      "We deliver exceptional services and create future-ready products using purposeful design, advanced engineering, and strategic innovation.",
    coreValues: defaultCoreValues,
    whatWeOffer: defaultWhatWeOffer,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const result = await aboutApi.getAbout();
        if (result.success && result.data) {
          setAbout(result.data);
          setFormData({
            vision: result.data.vision,
            mission: result.data.mission,
            coreValues:
              result.data.coreValues?.length > 0
                ? result.data.coreValues
                : defaultCoreValues,
            whatWeOffer:
              result.data.whatWeOffer?.length > 0
                ? result.data.whatWeOffer
                : defaultWhatWeOffer,
          });
        }
      } catch (err: any) {
        console.error("Error fetching about:", err);
        setError(err.message || "Failed to load about content");
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoreValueChange = (
    index: number,
    field: keyof CoreValue,
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev.coreValues];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, coreValues: updated };
    });
  };

  const handleAddCoreValue = () => {
    setFormData((prev) => ({
      ...prev,
      coreValues: [
        ...prev.coreValues,
        { icon: "⭐", title: "", desc: "", bg: "bg-blue-100 text-blue-600" },
      ],
    }));
  };

  const handleRemoveCoreValue = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      coreValues: prev.coreValues.filter((_, i) => i !== index),
    }));
  };

  const handleOfferCategoryChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.whatWeOffer];
      updated[index] = { ...updated[index], section: value };
      return { ...prev, whatWeOffer: updated };
    });
  };

  const handleOfferItemChange = (
    categoryIndex: number,
    itemIndex: number,
    value: string
  ) => {
    setFormData((prev) => {
      const updatedCategories = [...prev.whatWeOffer];
      const updatedItems = [...updatedCategories[categoryIndex].items];
      updatedItems[itemIndex] = { title: value };
      updatedCategories[categoryIndex] = {
        ...updatedCategories[categoryIndex],
        items: updatedItems,
      };
      return { ...prev, whatWeOffer: updatedCategories };
    });
  };

  const handleAddOfferCategory = () => {
    setFormData((prev) => ({
      ...prev,
      whatWeOffer: [
        ...prev.whatWeOffer,
        {
          section: "New Offering",
          items: [{ title: "Offer detail" }],
        },
      ],
    }));
  };

  const handleRemoveOfferCategory = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      whatWeOffer: prev.whatWeOffer.filter((_, i) => i !== index),
    }));
  };

  const handleAddOfferItem = (categoryIndex: number) => {
    setFormData((prev) => {
      const updatedCategories = [...prev.whatWeOffer];
      const items = [...updatedCategories[categoryIndex].items, { title: "" }];
      updatedCategories[categoryIndex] = {
        ...updatedCategories[categoryIndex],
        items,
      };
      return { ...prev, whatWeOffer: updatedCategories };
    });
  };

  const handleRemoveOfferItem = (categoryIndex: number, itemIndex: number) => {
    setFormData((prev) => {
      const updatedCategories = [...prev.whatWeOffer];
      const items = updatedCategories[categoryIndex].items.filter(
        (_, i) => i !== itemIndex
      );
      updatedCategories[categoryIndex] = {
        ...updatedCategories[categoryIndex],
        items,
      };
      return { ...prev, whatWeOffer: updatedCategories };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (about) {
        const result = await aboutApi.updateAbout(about._id, formData);
        if (result.success) {
          setAbout(result.data);
          alert("About content updated successfully!");
        }
      } else {
        const result = await aboutApi.createAbout(formData);
        if (result.success) {
          setAbout(result.data);
          alert("About content created successfully!");
        }
      }
    } catch (err: any) {
      console.error("Error saving about:", err);
      setError(err.message || "Failed to save about content");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-xl text-white">Loading About content...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">About Company</h1>
        <p className="text-zinc-400">
          Manage your company vision, mission, core values, and What We Offer
          section shown on the client website.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-white mb-4">
          {about ? "Update About Content" : "Create About Content"}
        </h2>

        {/* Vision */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Vision
          </label>
          <textarea
            name="vision"
            value={formData.vision}
            onChange={handleFieldChange}
            rows={4}
            className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mission */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Mission
          </label>
          <textarea
            name="mission"
            value={formData.mission}
            onChange={handleFieldChange}
            rows={4}
            className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Core Values */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">Core Values</h3>
            <button
              type="button"
              onClick={handleAddCoreValue}
              className="text-sm px-3 py-1 rounded-md bg-zinc-800 text-white hover:bg-zinc-700"
            >
              + Add Value
            </button>
          </div>
          <p className="text-xs text-zinc-500 mb-4">
            These map directly to the values grid on the client About page.
          </p>

          <div className="space-y-4">
            {formData.coreValues.map((value, index) => (
              <div
                key={index}
                className="border border-zinc-800 rounded-lg p-4 bg-zinc-950/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-zinc-400">
                    Value #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCoreValue(index)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Icon (emoji or text)
                    </label>
                    <input
                      type="text"
                      value={value.icon}
                      onChange={(e) =>
                        handleCoreValueChange(index, "icon", e.target.value)
                      }
                      className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={value.title}
                      onChange={(e) =>
                        handleCoreValueChange(index, "title", e.target.value)
                      }
                      className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={value.desc}
                      onChange={(e) =>
                        handleCoreValueChange(index, "desc", e.target.value)
                      }
                      className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Background classes (Tailwind)
                  </label>
                  <input
                    type="text"
                    value={value.bg}
                    onChange={(e) =>
                      handleCoreValueChange(index, "bg", e.target.value)
                    }
                    className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    placeholder="e.g. bg-blue-100 text-blue-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What We Offer */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">What We Offer</h3>
            <button
              type="button"
              onClick={handleAddOfferCategory}
              className="text-sm px-3 py-1 rounded-md bg-zinc-800 text-white hover:bg-zinc-700"
            >
              + Add Category
            </button>
          </div>
          <p className="text-xs text-zinc-500 mb-4">
            These categories power the two cards (Services vs Products) on the
            public About page.
          </p>

          <div className="space-y-4">
            {formData.whatWeOffer.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="border border-zinc-800 rounded-lg p-4 bg-zinc-950/50"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={category.section}
                      onChange={(e) =>
                        handleOfferCategoryChange(categoryIndex, e.target.value)
                      }
                      className="w-full rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveOfferCategory(categoryIndex)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          handleOfferItemChange(
                            categoryIndex,
                            itemIndex,
                            e.target.value
                          )
                        }
                        className="flex-1 rounded-md bg-zinc-950 border border-zinc-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Offer highlight"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveOfferItem(categoryIndex, itemIndex)
                        }
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleAddOfferItem(categoryIndex)}
                  className="mt-3 text-xs px-3 py-1 rounded-md bg-zinc-800 text-white hover:bg-zinc-700"
                >
                  + Add Offer Item
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving
            ? about
              ? "Updating..."
              : "Creating..."
            : about
            ? "Update About"
            : "Create About"}
        </button>
      </form>

      {/* Simple preview to mirror client layout structure */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Client Preview (Structure)
        </h2>
        <p className="text-zinc-400 text-sm mb-4">
          This preview helps you see how the content will roughly map onto the
          client About page (hero vision/mission and core values grid).
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Vision</h3>
            <p className="text-zinc-400 text-sm">{formData.vision}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Mission</h3>
            <p className="text-zinc-400 text-sm">{formData.mission}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Core Values
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {formData.coreValues.map((value, index) => (
                <div
                  key={index}
                  className="border border-zinc-800 rounded-lg p-3 bg-zinc-950/60"
                >
                  <div className="text-2xl mb-2">{value.icon}</div>
                  <div className="text-white font-medium text-sm mb-1">
                    {value.title}
                  </div>
                  <div className="text-zinc-400 text-xs">{value.desc}</div>
                  <div className="text-zinc-500 text-[10px] mt-2">
                    {value.bg}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              What We Offer
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.whatWeOffer.map((category, index) => (
                <div
                  key={index}
                  className="border border-zinc-800 rounded-lg p-4 bg-zinc-950/60"
                >
                  <div className="text-white font-semibold mb-2">
                    {category.section}
                  </div>
                  <ul className="text-zinc-400 text-sm space-y-1 list-disc list-inside">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item.title}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
