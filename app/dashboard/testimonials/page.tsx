"use client";

export default function TestimonialsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Testimonials</h1>
        <p className="text-zinc-400">
          Manage customer testimonials and reviews
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Coming Soon</h3>
          <p className="text-zinc-400">
            Testimonials management will be available soon
          </p>
        </div>
      </div>
    </div>
  );
}
